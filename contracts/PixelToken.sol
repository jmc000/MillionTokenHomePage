pragma solidity ^0.5.0;

import "./Sources/ERC721.sol";

/**
 * @title ERC721 Non-Fungible Token Standard basic implementation
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */

contract PixelToken is ERC721 {
    uint256 constant lignesPixelImage = 1000;
    uint256 constant colonnesPixelImage = 1000;
    uint256 totalToken;
    address contractOwner;
    string constant symbol;
    int constant startingPrice;

    mapping (uint256 => Pixel) pixelList;

    constructor() public {
        contractOwner = msg.sender;
        totalToken = lignesPixelImage * colonnesPixelImage;
        symbol = "PTC";
        startingPrice = 1;
        uint256 tokenCreated = 0;
        while(tokenCreated != totalToken){
            for(uint256 i = 0; i < lignesPixelImage; i++){
                for(uint256 j = 0; j < colonnesPixelImage; j++){
                    createPixel(i, j, tokenCreated, startingPrice);
                }
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

    modifier validatorOnly(uint256 idPixel){
        require(msg.sender == pixelList[idPixel].owner || msg.sender == contractOwner, "You're not allowed to do this.");
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
        int priceUSD;
        uint8 colorR;
        uint8 colorG;
        uint8 colorB;
    }

    function createPixel(uint256 _id, uint256 _ligne, uint256 _colonne, int _priceUSD) private {
        Pixel memory p;

        p.id = _id;

        p.ligne = _ligne;
        p.colonne = _colonne;

        p.owner = contractOwner;

        p.priceUSD = _priceUSD;
        p.colorR = 0;
        p.colorG = 0;
        p.colorB = 0;

        pixelList[p.id] = p;
    }

    function modifyPrice(uint256 id, int newPrice) public con {
        pixelList[id].priceUSD = newPrice;
    }

    function searchUnique(uint256 _ligne, uint256 _colonne) public{
        uint256 idSearched = -1;
        for(int i = 0; i < totalToken; i++){
            if(pixelList[i].ligne == _ligne && pixelList[i].colonne == _colonne){
                idSearched = i;
            }
        }
        if(idSearched == -1) break; //effectuez recherches sur le comportement
        return idSearched;
    }

    function searchZones(uint256 leftTopCornerX, uint256 leftTopCornerY, uint rightBottomCornerX, uint256 rightBottomCornerY)
    public returns (uint256[]){
        contractOwnerOnly();
        length = (rightBottomCornerX - leftTopCornerX) * (rightBottomCornerY - leftTopCornerY);
        uint256[length] idPix;
        int compteur = 0;
        for(uint256 i = leftTopCornerX; i <= rightBottomCornerX ; i++){
            for(uint256 j = leftTopCornerY; j <= rightBottomCornerY; j++){
                idPix[compteur] = searchUnique(i, j);
            }
        }
    }
}