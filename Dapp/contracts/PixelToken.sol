pragma solidity ^0.5.6;

//@title One Million Dollar Project

contract PixelToken{
    uint256 constant lignesPixelImage = 1000;
    uint256 constant colonnesPixelImage = 1000;
    uint256 totalToken;
    address contractOwner;
    string constant symbol = "PTC";
    int constant startingPrice = 1;
    bool userAnswer;

    mapping (uint256 => Pixel) pixelList;
    mapping (address => uint256) fundsPerOwner;

    constructor() public {
        contractOwner = msg.sender;
        totalToken = lignesPixelImage * colonnesPixelImage;
        uint256 tokenCreated = 0;
        for(uint256 i = 0; i < lignesPixelImage; i++){
            for(uint256 j = 0; j < colonnesPixelImage; j++){
                createPixel(tokenCreated, i, j, startingPrice);
                tokenCreated++;
            }
        }
    }

    function setAnswer(bool _userAnswer) public{
        userAnswer = _userAnswer;
    }

    /*
    Restriction
     */

    modifier contractOwnerOnly(){
        require(msg.sender == contractOwner, "Vous n'êtes pas le propriétaire du contrat.");
        _;
    }

    modifier tokenOwnerOnly(uint256 idPixel){
        require(msg.sender == pixelList[idPixel].owner, "Vous n'êtes pas le propriétaire du token.");
        _;
    }

    /*
    END OF Restriction
     */

    /*
    EVENTS
    */

    event statut(
        bool statutV
    );

    event sendInterface(
        string res
    );

    event prix(
        int prixTot
    );

    /*
    END OF events
     */

    struct Pixel
    {
        uint256 id;

        uint256 ligne;
        uint256 colonne;
        address owner;
        int priceETH;
        bool statutVente;
    }

    function createPixel(uint256 _id, uint256 _ligne, uint256 _colonne, int _priceETH) private {
        Pixel memory p;

        p.id = _id;

        p.ligne = _ligne;
        p.colonne = _colonne;

        p.owner = contractOwner;

        p.priceETH = _priceETH;
        p.statutVente = true;

        pixelList[p.id] = p;
    }

    function modifyPrice(uint256 id, int newPrice) public tokenOwnerOnly(id) {
        pixelList[id].priceETH = newPrice;
    }

    function searchUnique(uint256 _ligne, uint256 _colonne) internal view returns (int){
        int256 idSearched = -1;
        for(uint8 i = 0; i < totalToken; i++){
            if(pixelList[i].ligne == _ligne && pixelList[i].colonne == _colonne){
                idSearched = i;
            }
        }
        return idSearched;
    }

    function searchZones(uint256 leftTopCornerX, uint256 leftTopCornerY, uint rightBottomCornerX, uint256 rightBottomCornerY) internal
    view returns (uint256[] memory){    //rajouter restrictions pour éviter monopole
        uint256 aire = (rightBottomCornerX - leftTopCornerX) * (rightBottomCornerY - leftTopCornerY);
        uint256 tailleTab = 0;
        if(aire!=0) tailleTab = aire;
        if(((rightBottomCornerX - leftTopCornerX)==0) && ((rightBottomCornerY - leftTopCornerY)==0)) tailleTab = 1;
        if((rightBottomCornerX - leftTopCornerX)==0) tailleTab = (rightBottomCornerY - leftTopCornerY);
        if((rightBottomCornerY - leftTopCornerY)==0) tailleTab = (rightBottomCornerX - leftTopCornerX);
        uint256[] memory idPix = new int[](tailleTab);
        uint256 compteur = 0;
        for(uint256 i = leftTopCornerX; i <= rightBottomCornerX ; i++){
            for(uint256 j = leftTopCornerY; j <= rightBottomCornerY; j++){
                idPix[compteur] = searchUnique(i, j);
                compteur ++;
            }
        }
        return idPix;
    }


    /*
    Exchanges
    */

    function priceReturn(uint256[] memory tab) internal view returns (int){
        int totalPriceETH = 0;
        for(uint i = 0; i < tab.length; i++)
        {
            totalPriceETH += pixelList[tab[i]].priceETH;
        }
        return totalPriceETH;
    }

    function saleStatusUnique(uint256 memory _id, bool statut) internal view tokenOwnerOnly(_id){
        pixelList[_id].statutVente = statut;
    }

    function saleStatusGroup(uint256[] memory tab, bool statut) public{
        for(uint i = 0; i < tab.length; i++){
            saleStatusUnique(tab[i], statut);
        }
    }

    function statusVerification(uint256[] _idList) internal view returns (bool){
        bool memory statGen = true;
        for(uint i = 0; i < _idList.length; i++)
        {
            if(_idList[i] != true){
                statGen = false;
            }
        }
        return statGen;
    }

    function fundsRefunds(uint256[] _idList) internal {
        for(int i = 0; i < _idList.length(); i++){
            contractOwner.send(fundsPerOwner(_idList[i].owner));
        }
    }
    
    function exchange(uint256[] _idList, int _prixTot) internal payable{
        for(int i = 0; i < _idList.length(); i++){
            msg.value += _idList[i].priceETH;
            fundsPerOwner(_idList[i].owner) += _idList[i].priceETH;
            _idList[i].owner = msg.sender;
        }
    }


    function buy(uint256[] _idList) public{
        bool stat = statusVerification(_idList);
        emit statut(stat);
        if(stat == true){
            int prixTot = priceReturn(_idList);
            emit sendInterface("The price of this transaction is of " + prixTot + " ETH");
            //await réponse du site pour userAnswer
            if(userAnswer){
                exchange(_idList, prixTot);
                fundsRefunds(_idList);
            }
        }
    }


    /*
    END of Exchanges
    */
}