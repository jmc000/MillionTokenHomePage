pragma solidity ^0.6.0;

//@title One Million Dollar Project

contract PixelToken{

    uint256 constant lignesPixelImage = 1000;
    uint256 constant colonnesPixelImage = 1000;
    uint256 totalToken;
    uint public nbOfPixels = 0;
    address payable contractOwner;
    string public constant symbol = "PXL";
    //we choose the price according to the area of the pixel
    uint[] startingPrices = [10 wei,20 wei,50 wei];
    bool userAnswer;

    constructor() public {
        contractOwner = msg.sender;
        totalToken = lignesPixelImage * colonnesPixelImage;
        for (uint i = 480; i < 520; i ++){
            for (uint j = 480; j < 520; j ++){
                createPixel(i,j,true);
            }
        }
    }

    struct Pixel
    {
        uint256 id;
        uint256 line;
        uint256 column;
        address payable owner;
        uint priceWEI;
        bool isAvailableForSale;
        bool hasBeenCreated;
    }

    mapping (uint256 => Pixel) public pixelList;   // pixelId => Pixel
    mapping (uint => Pixel) public pixelForSale;
    mapping (uint => mapping (uint => bool)) public pairNotAvailable;

    /* GET THE INITIAL PRICE ACCORDING TO THE PIXEL COORD */
    function getInitialPixelPrice(uint line, uint column) public view returns(uint){
        require(line > 0 && column > 0 && line <= 1000 && column <= 1000,
        "Error, line and column indexes should be between 1 and 1000 (included).");
        uint price = 0;
        if( (line <= 125) || (875 < line) || (column <= 125) || (875<column)){
            price = startingPrices[0];
        }
        else if ( (125<line && line <= 875 && 125 < column && column < 375) || (125<line && line <= 875 && 625 < column && column <= 875)){
            price = startingPrices[1];
        }
        else if( 125 < line && line <= 875 && 375 < column && column <= 625){
            price = startingPrices[2];
        }
        return price;
    }

    /* CREATE TOKEN */
    event newTokenCreated(uint id);
    event pixelSetForSale(uint _id,uint _price, address _sellerAddress);

    modifier onlyContractOwner(){
        require(msg.sender == contractOwner, "Error, you are not the owner of the contract.");
        _;
    }
    function createPixel(uint256 _line, uint256 _column, bool _onSale) public {
        require(nbOfPixels < totalToken,"Error, can't create more pixel.");
        require( 0 < _line && _line < 1000 && 0 < _column && _column < 1000,
        "Error, line and column indexes out of range.");
        require( pairNotAvailable[_line][_column] == false,
        "Error, the pixel (x,y) already exists.");
        nbOfPixels++;
        Pixel memory p;
        p.id = nbOfPixels;
        p.line = _line;
        p.column = _column;
        p.owner = contractOwner;
        p.priceWEI = getInitialPixelPrice(_line,_column);
        p.hasBeenCreated = true;
        if (_onSale == true) {  //add the pixel to the sale list
            p.isAvailableForSale = true;
            pixelForSale[p.id] = p;
            emit pixelSetForSale (p.id,p.priceWEI,p.owner);
        }
        pixelList[p.id] = p;
        pairNotAvailable[_line][_column] = true;
        emit newTokenCreated(p.id);
    }

    /* GET THE COORD OF A PIXEL THANKS TO HIS ID */

    function getPixelLine(uint _pixelId) public view returns (uint){
        require(pixelList[_pixelId].id != 0,"Error, no corresponding pixel id.");
        return pixelList[_pixelId].line;
    }
    function getPixelCol(uint _pixelId) public view returns (uint){
        require(pixelList[_pixelId].id != 0,"Error, no corresponding pixel id.");
        return pixelList[_pixelId].column;
    }

    /* BUY TOKEN in the ICO */
    modifier isAvailableForSale(uint _id){
        require( pixelList[_id].isAvailableForSale == true,
        "Error, the pixel you choose is not available for sale.");
        _;
    }
    modifier isRightPrice(uint _id){
        require(pixelList[_id].priceWEI <= msg.value, "Error, the message value is lower than the price asked.");
        _;
    }
    modifier isContractOwner(uint _pixelId){
        require(pixelList[_pixelId].owner == contractOwner,"Error, the owner is not the contract owner.");
        _;
    }
    event pixelBought(uint _pixelId, address _newOwner);

    function buyPixel(uint _pixelId) public payable isAvailableForSale(_pixelId) isRightPrice(_pixelId) isContractOwner(_pixelId){
        // contractOwner.transfer(pixelList[_pixelId].priceWEI);
        pixelList[_pixelId].owner = msg.sender;
        pixelList[_pixelId].isAvailableForSale = false;
        delete pixelForSale[_pixelId]; //delete the pixel from the "on sale" mapping
        emit pixelBought(_pixelId, msg.sender);
    }


    /* MODIFY PRICE -   The contract owner can modify the price only if he is the owner of the pixel
                        (i.e.the pixel has not been sell yet).
                        In the other side, a token owner (!= contractOwner) can't modify the price of his token
                        without puting it in sale status.
    */

    modifier onlyPixelOwner(uint _id){
        require(pixelList[_id].owner == msg.sender,"Error, your are not the pixel owner.");
        _;
    }
    event tokenPriceModified(uint id, uint newPrice);

    // function modifyPrice(uint256 _id, uint _newWeiPrice) public onlyContractOwner() onlyPixelOwner(_id) {
    //     pixelList[_id].priceWEI = _newWeiPrice;
    //     emit tokenPriceModified(_id,_newWeiPrice);
    // }


    /* SEARCH A TOKEN BY COORD */
    function searchTokenByCoord(uint256 _line, uint256 _column) public view returns (int){
        int256 idSearched = -1;
        for(uint8 i = 0; i < totalToken; i++){
            if(pixelList[i].line == _line && pixelList[i].column == _column){
                idSearched = i;
            }
        }
        require(idSearched != -1,"Error, pixel not found.");
        return idSearched;
    }


    /* MODIFY TOKEN PRICE */
    event pixelPriceModified(uint _idPixel, uint _newWeiPice);

    function modifyPixelPrice(uint _idPixel, uint _newWeiPice) public onlyPixelOwner(_idPixel){
        pixelList[_idPixel].priceWEI = _newWeiPice;
        emit pixelPriceModified(_idPixel,_newWeiPice);
    }

    /* PUT A TOKEN FOR SALE*/
    function setPixelForSale(uint _idPixel) public onlyPixelOwner(_idPixel){
        pixelList[_idPixel].isAvailableForSale = true;
        pixelForSale[_idPixel] = pixelList[_idPixel];
        emit pixelSetForSale(_idPixel,pixelList[_idPixel].priceWEI,msg.sender);
    }

    /* BUY PIXEL FOR SALE */
    event pixelBoughtOnSale(uint _id, uint _price, address _newOwner);

    modifier isRightSalePrice(uint _id, uint _price){
        require(pixelList[_id].priceWEI <= _price, "Error, the message value is lower than the price asked.");
        _;
    }
    modifier isPixelOwner(uint _id, address payable _pixelOwner){
        require(pixelList[_id].owner == _pixelOwner, "Error, the address is not the owner's one.");
        _;
    }
    function buyPixelForSale(uint _pixelId, address payable _pixelOwner, uint _weiPrice) public
        isAvailableForSale(_pixelId) isRightSalePrice(_pixelId,_weiPrice) isPixelOwner(_pixelId,_pixelOwner){

        _pixelOwner.transfer(_weiPrice);
        pixelList[_pixelId].owner = msg.sender;
        pixelList[_pixelId].isAvailableForSale = false;

        delete pixelForSale[_pixelId];
        emit pixelBoughtOnSale(_pixelId,pixelList[_pixelId].priceWEI,msg.sender);
    }


    /* BUY RECTANGULAR AREAS -----> PB: OUT OF GAS
    */
    // struct Area{
    //     uint id;
    //     mapping (uint256 => Pixel) pixels;
    //     uint topLeftCornerId;
    //     uint topRightCornerId;
    //     uint bottomLeftCornerId;
    //     uint bottomRightCornerId;
    //     uint totalAreaPrice;    //in WEI
    //     uint salePrice;
    //     bool isAvailableForSale;
    //     address payable owner;
    // }

    // mapping (uint => Area) public areaList;
    // uint public nbOfAreasDeclared = 0;

    // event areaDeclared(uint _areaId, address _owner);

    // modifier checkIfAreaOwner(uint a, uint b, uint c, uint d){
    //     require( getPixelLine(a) == getPixelLine(b) && getPixelLine(c) == getPixelLine(d) &&
    //             getPixelCol(a) == getPixelCol(c) && getPixelCol(b) == getPixelCol(d),
    //             "Error, abcd is not a rectangle.");
    //     uint x; uint y; uint X; uint Y;
    //     x = getPixelLine(a);
    //     y = getPixelCol(a);
    //     X = getPixelLine(d);
    //     Y = getPixelCol(d);
    //     uint _pixelId;
    //     for(uint i = x; i < X; i ++){
    //         for (uint j = y; j < Y;j ++){
    //             _pixelId = uint(searchTokenByCoord(i,j));
    //             require(pixelList[_pixelId].hasBeenCreated == true,"Error, at least one pixel has not been created.");
    //             require(pixelList[_pixelId].owner == msg.sender,"Error, you are not the owner of at least one pixel of the area.");
    //         }
    //     }
    //     _;
    // }

    // function declareArea(uint _topLeftCorner, uint _topRightCorner, uint _bottomLeftCorner, uint _bottomRightCorner) public
    //             checkIfAreaOwner(_topLeftCorner,_topRightCorner,_bottomLeftCorner,_bottomRightCorner){
    //     Area memory newArea;
    //     nbOfAreasDeclared ++;
    //     newArea.id = nbOfAreasDeclared;
    //     newArea.topLeftCornerId = _topLeftCorner;
    //     newArea.topRightCornerId = _topRightCorner;
    //     newArea.bottomLeftCornerId = _bottomLeftCorner;
    //     newArea.bottomRightCornerId = _bottomRightCorner;
    //     areaList[newArea.id] = newArea;
    //     areaList[newArea.id].totalAreaPrice = getAreaPrice(newArea.id);
    //     areaList[newArea.id].salePrice = areaList[newArea.id].totalAreaPrice;
    //     setAreaPixelsList(newArea.id);
    //     emit areaDeclared(newArea.id,msg.sender);
    // }

    // function getAreaPrice(uint _areaId) public view returns(uint){
    //     uint x; uint y; uint X; uint Y;
    //     x = getPixelLine(areaList[_areaId].topLeftCornerId);
    //     y = getPixelCol(areaList[_areaId].topLeftCornerId);
    //     X = getPixelLine(areaList[_areaId].bottomRightCornerId);
    //     Y = getPixelCol(areaList[_areaId].bottomRightCornerId);
    //     uint _totalPrice;
    //     uint _pixelId;
    //     for(uint i = x; i < X; i ++){
    //         for (uint j = y; j < Y;j ++){
    //             _pixelId = uint(searchTokenByCoord(i,j));
    //             _totalPrice += pixelList[_pixelId].priceWEI;
    //         }
    //     }
    //     return _totalPrice;
    // }

    // function setAreaPixelsList(uint _areaId) public {
    //     uint x; uint y; uint X; uint Y;
    //     x = getPixelLine(areaList[_areaId].topLeftCornerId);
    //     y = getPixelCol(areaList[_areaId].topLeftCornerId);
    //     X = getPixelLine(areaList[_areaId].bottomRightCornerId);
    //     Y = getPixelCol(areaList[_areaId].bottomRightCornerId);
    //     uint _pixelId;
    //     for(uint i = x; i < X; i ++){
    //         for (uint j = y; j < Y;j ++){
    //             _pixelId = uint(searchTokenByCoord(i,j));
    //             areaList[_areaId].pixels[_pixelId] = pixelList[_pixelId];
    //         }
    //     }
    // }

    // /* SELL AREA */
    // modifier onlyAreaOwner(uint _id){
    //     require(areaList[_id].owner == msg.sender,"Error, you are not the area owner.");
    //     _;
    // }
    // event areaForSale(uint _areaId, uint _price);

    // function setAreaForSale(uint _areaId) public onlyAreaOwner(_areaId){
    //     areaList[_areaId].isAvailableForSale = true;
    //     uint x; uint y; uint X; uint Y;
    //     x = getPixelLine(areaList[_areaId].topLeftCornerId);
    //     y = getPixelCol(areaList[_areaId].topLeftCornerId);
    //     X = getPixelLine(areaList[_areaId].bottomRightCornerId);
    //     Y = getPixelCol(areaList[_areaId].bottomRightCornerId);
    //     uint _pixelId;
    //     for(uint i = x; i < X; i ++){
    //         for (uint j = y; j < Y;j ++){
    //             _pixelId = uint(searchTokenByCoord(i,j));
    //             pixelList[areaList[_areaId].pixels[_pixelId].id].isAvailableForSale = true;
    //         }
    //     }
    //     emit areaForSale(_areaId,areaList[_areaId].salePrice);
    // }

    // // event areaSalePriceModified(uint _areaId, uint _price);

    // // function changeAreaPrice(uint _areaId, uint _newPrice) public onlyAreaOwner(_areaId){
    // //     areaList[_areaId].salePrice = _newPrice;
    // //     emit areaSalePriceModified(_areaId,_newPrice);
    // // }

    // event areaBougth(uint _areaId, uint _price, address _newOwner);

    // function buyArea(uint _areaId) public payable{
    //     require(msg.value >= areaList[_areaId].salePrice,"Error, not enough money sent.");
    //     require(areaList[_areaId].isAvailableForSale = true,"Error, area not available for sale.");
    //     areaList[_areaId].owner.transfer(areaList[_areaId].salePrice);
    //     areaList[_areaId].owner = msg.sender;
    //     areaList[_areaId].isAvailableForSale = false;
    //     uint x; uint y; uint X; uint Y;
    //     x = getPixelLine(areaList[_areaId].topLeftCornerId);
    //     y = getPixelCol(areaList[_areaId].topLeftCornerId);
    //     X = getPixelLine(areaList[_areaId].bottomRightCornerId);
    //     Y = getPixelCol(areaList[_areaId].bottomRightCornerId);
    //     uint _pixelId;
    //     for(uint i = x; i < X; i ++){
    //         for (uint j = y; j < Y;j ++){
    //             _pixelId = uint(searchTokenByCoord(i,j));
    //             pixelList[areaList[_areaId].pixels[_pixelId].id].owner = msg.sender;
    //         }
    //     }
    //     emit areaBougth(_areaId,areaList[_areaId].salePrice,areaList[_areaId].owner);
    // }

    // event areaUndeclared(uint _id);

    // function undeclaredArea(uint _areaId) public onlyAreaOwner(_areaId){
    //     delete areaList[_areaId];
    //     emit areaUndeclared(_areaId);
    // }

}