pragma solidity ^0.5.0;

import "./Sources/ERC721XToken.sol";

contract PixelToken is ERC721 {
    uint256 constant lignesPixelImage = 10000;
    uint256 constant colonnesPixelImage = 10000;
    uint256 totalToken;
    address contractOwner;
    string constant symbol;
    int constant startingPrice;

    mapping (uint256 => Pixel) pixelList;

    constructor() public {
        contractOwner = msg.sender;
        totalToken = lignesPixelImage * colonnesPixelImage;
        symbol = "PTC";
        startingPrice = 0.01;
        uint256 tokenCreated = 0;
        for(uint256 i = 0; i < lignesPixelImage; i++){
            for(uint256 j = 0; j < colonnesPixelImage; j++){
                createPixel(i, j, tokenCreated, startingPrice);
            }
        }
    }

    /*
    Restriction
     */

    modifier contractOwnerOnly(){
        require(msg.sender == contractOwner, "You're not allowed to do this.");
        _;
    }

    modifier tokenOwnerOnly(uint256 idPixel){
        require(msg.sender == pixelList[idPixel].owner, "You're not allowed to do this.");
        _;
    }

    /*
    END OF Restriction
     */

    struct Pixel
    {
        uint256 id;

        uint256 ligne;
        uint256 colonne;
        address owner;
        int priceETH;
    }

    function createPixel(uint256 _id, uint256 _ligne, uint256 _colonne, int _priceETH) private {
        Pixel memory p;

        p.id = _id;

        p.ligne = _ligne;
        p.colonne = _colonne;

        p.owner = contractOwner;

        p.priceETH = _priceETH;

        pixelList[p.id] = p;
    }

    function modifyPrice(uint256 id, int newPrice) public tokenOwnerOnly() {
        pixelList[id].priceETH = newPrice;
    }

    function searchUnique(uint256 _ligne, uint256 _colonne) internal returns (uint256){
        uint256 idSearched = -1;
        for(int i = 0; i < totalToken; i++){
            if(pixelList[i].ligne == _ligne && pixelList[i].colonne == _colonne){
                idSearched = i;
            }
        }
        if(idSearched == -1) break; //effectuez recherches sur le comportement
        return idSearched;
    }

    function searchZones(uint256 leftTopCornerX, uint256 leftTopCornerY, uint rightBottomCornerX, uint256 rightBottomCornerY) internal
    returns (uint256[]){
        aire = (rightBottomCornerX - leftTopCornerX) * (rightBottomCornerY - leftTopCornerY);
        uint256 tailleTab;
        if(aire!=0) tailleTab = aire;
        if(((rightBottomCornerX - leftTopCornerX)==0) && ((rightBottomCornerY - leftTopCornerY)==0)) tailleTab = 1;
        if((rightBottomCornerX - leftTopCornerX)==0) tailleTab = (rightBottomCornerY - leftTopCornerY);
        if((rightBottomCornerY - leftTopCornerY)==0) tailleTab = (rightBottomCornerX - leftTopCornerX);
        uint256[tailleTab] idPix;
        int compteur = 0;
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

    function priceCalculating(uint256[] tab) internal returns (uint256){
        uint256 totalPriceETH = 0;
        for(int i = 0; i < tab.length; i++)
        {
            totalPriceETH += pixelList[tab[i]].priceETH;
        }
        return totalPriceETH;
    }

    /*
    END of Exchanges
    */
}