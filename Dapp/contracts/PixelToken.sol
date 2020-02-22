pragma solidity ^0.5.6;

//@title One Million Dollar Project

contract PixelToken{
    uint256 constant lignesPixelImage = 1000;
    uint256 constant colonnesPixelImage = 1000;
    uint256 totalToken;
    address contractOwner;
    string constant symbol = "PTC";
    int constant startingPrice = 1;

    mapping (uint256 => Pixel) pixelList;

    //  EVENTS

    event achatReussi(){

    }

    event affichageMessage(){

    }

    event qA(){

    }

    //  END OF EVENTS

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

    /*
    Restriction
     */

    modifier contractOwnerOnly(){
        require(msg.sender == contractOwner, "You're not allowed to do this.");
        _;
    }

    modifier balanceSuffisante(address ad, int balanceMin){
        require(ad.balance >= balanceMin)
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
        bool statutVente;
    }

/* solium-disable-next-line */
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

    function saleStatusUnique(uint256 memory _id, bool status) internal view tokenOwnerOnly(_id){
        pixelList[_id].statutVente = status;
    }

    function saleStatusGroup(uint256[] memory tab, bool status) public{
        for(uint i = 0; i < tab.length; i++){
            saleStatusUnique(tab[i], status);
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

    function transfer(uint256 _id, address _newOwner) internal view{
        _id.owner = _newOwner;
        _id.statutVente = false;
    }

    /*
    function pay(uint256 _id, int _prix) internal view payable balanceSuffisante(msg.sender, _prix){

    }


    function buy(uint256[] _idList) public{
        int prixTot = priceReturn(_idList);
        if(statusVerification(_idList) == true && msg.sender.balance >= prixTot){        ***NOTIFIER STATUT GENERAL (OK POUR VENTE TOTALE OU ERREUR CAR PIXEL PAS EN VENTE)***
            ***NOTIFICATION DE L'ACHETEUR DU PRIX TOTAL*** => Y/N
            ***SI NON => ACHAT ANNULE, MESSAGE DE CONFIRMATION***
            ***SI OUI => BASCULE SUR FONCTION PAYABLE AVEC LIST ID + FONCTION TRANSFERT DE PROPRIETE***
            for(uint i = 0; i < _idList.length; i++){
                pay(_idList[i], )
                transfer(_idList[i], msg.sender);
            }
            ***RETOUR EVENT ACHAT***
        }
        else emit
    }

    */

    /*

    achat:
    - sélection zone depuis site
    - entrée coordonnée
    - assistance avec utilisateur donnant taille image et recherche automatique de zone compatible

    /!\ statutVente à false si achat réussi
    /!\ détermination  des statuts payable pour certaines fonctions
    /!\ créer tests unitaires et tests d'intégration

    */

    /*
    END of Exchanges
    */
}