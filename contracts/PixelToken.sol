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
    string constant symbol = "PTC";
    int constant startingPrice = 1;

    mapping (uint256 => Pixel) pixelList;

    constructor() public {
        contractOwner = msg.sender;
        totalToken = lignesPixelImage * colonnesPixelImage;
        uint256 tokenCreated = 0;
        while(tokenCreated != totalToken){
            for(uint256 i = 0; i < lignesPixelImage; i++){
                for(uint256 j = 0; j < colonnesPixelImage; j++){
                    createPixel(i, j, tokenCreated, contractOwner, startingPrice);
                }
            }
        }
    }

    struct Pixel
    {
        uint256 ligne;
        uint256 colonne;
        uint256 id;
        address owner;
        int priceUSD;
    }

    function createPixel(uint256 _ligne, uint256 _colonne, uint256 _id, address _owner, int _priceUSD) private {
        Pixel memory p;

        p.ligne = _ligne;
        p.colonne = _colonne;
        p.id = _id;
        p.owner = _owner;
        p.priceUSD = _priceUSD;

        pixelList[p.id] = p;
    }

    function modifyPrice(uint256 id, int newPrice) public {
        require(msg.sender == pixelList[id].owner || msg.sender == contractOwner, "You're not authorized to do this.");
        pixelList[id].priceUSD = newPrice;
    }
}