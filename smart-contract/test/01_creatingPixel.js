const pixelToken = artifacts.require('PixelToken')

let tryCatch = require('./exception.js').tryCatch;
let errTypes = require('./exception.js').errTypes;

contract('Creating Pixel', function (accounts) {

    //set up before each test
    beforeEach('setup contract for each test', async function () {
        //Deploying contract
        PixelTokenInstance = await pixelToken.new({from: accounts[0]})
    })

    //First test
    it('Create a new pixel', async function () {
        //create the first pixel
        await PixelTokenInstance.createPixel(1,1,true, {from: accounts[0]});
        //try to create a pixel from an unauthorized account
        await tryCatch(PixelTokenInstance.createPixel(2,2,true, {from: accounts[1]}), errTypes.revert);
        //try to create a pixel with index out of range
        x = 100000
        y = 100000
        await tryCatch(PixelTokenInstance.createPixel(x,y,true, {from: accounts[0]}), errTypes.revert);
        await tryCatch(PixelTokenInstance.createPixel(x,y,true, {from: accounts[1]}), errTypes.revert);
        
        //create our first pixel
        await PixelTokenInstance.createPixel(5,3,true, {from: accounts[0]});
        //try to create a new pixel with the same coordonates
        await tryCatch(PixelTokenInstance.createPixel(5,3,true, {from: accounts[0]}), errTypes.revert);
        //try to create one with an unauthorized account
        await tryCatch(PixelTokenInstance.createPixel(1,1,true, {from: accounts[1]}), errTypes.revert);
        
        //check if getCoord return the good coordonates
        a = await PixelTokenInstance.getPixelLine(2);
        b = await PixelTokenInstance.getPixelCol(2);
        assert.equal(a,5);
        assert.equal(b,3);
        // assert.equal(tab[2],3);

        //check if pixel creation initialize well the isAvailableForSale bool
        retrievedPixel1Info = await PixelTokenInstance.pixelList(1);
        assert.equal(retrievedPixel1Info.isAvailableForSale, true);
        //verify the initial price
        assert.equal(retrievedPixel1Info.priceWEI, 10);

        //check the nb of pixels created
        nbOfPixelsCreated = await PixelTokenInstance.nbOfPixels();
        assert.equal(nbOfPixelsCreated, 2)

        //[ATTENTION] - searchTokenByCoord -> out of gas fct
        //verify that the searchTokenByCoord fct works well
        // id_returned = await PixelTokenInstance.searchTokenByCoord(5,3);
        // assert.equal(id_returned, 2)

    })
})