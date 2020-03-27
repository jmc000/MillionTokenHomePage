const pixelToken = artifacts.require('PixelToken')

let tryCatch = require('./exception.js').tryCatch;
let errTypes = require('./exception.js').errTypes;

contract('Sell my pixels', function (accounts) {
    beforeEach('setup contract for each test', async function () {
        //Deploying contract
        PixelTokenInstance = await pixelToken.new({from: accounts[0]})
        await PixelTokenInstance.createPixel(5,5,true, {from: accounts[0]});
        await PixelTokenInstance.createPixel(6,6,true, {from: accounts[0]});
        await PixelTokenInstance.createPixel(7,7,true, {from: accounts[0]});
    })

    //First test
    it('Sell a pixel', async function () {
        //buy the pixel 1
        await PixelTokenInstance.buyPixel(1,{from: accounts[1], value: 10});
        await PixelTokenInstance.buyPixel(2,{from: accounts[1], value: 10});
        await PixelTokenInstance.buyPixel(3,{from: accounts[1], value: 10});

        //try to buy a pixel 2 times
        await tryCatch(PixelTokenInstance.buyPixel(1,{from: accounts[1], value: 10}), errTypes.revert);        

        //modify the price
        newPrice = 100
        await PixelTokenInstance.modifyPixelPrice(1, newPrice,{from: accounts[1]});
        retrievedPixel1Info = await PixelTokenInstance.pixelList(1);
        assert.equal(newPrice,retrievedPixel1Info.priceWEI);

        //try to set pixel for sale of a pixel I didn't own
        await tryCatch(PixelTokenInstance.setPixelForSale(1,{from: accounts[2]}), errTypes.revert);

        //set my own pixel for sale
        await PixelTokenInstance.setPixelForSale(1,{from: accounts[1]});

        //try to set a pixel for sale that I dont own 
        await tryCatch(PixelTokenInstance.setPixelForSale(2,{from: accounts[3]}), errTypes.revert);

    })

    it('Buy a pixel for sale', async () => {
        //buy the pixel 1
        await PixelTokenInstance.buyPixel(1,{from: accounts[1], value: 10});
        await PixelTokenInstance.buyPixel(2,{from: accounts[1], value: 10});

        //set my pixel for sale
        await PixelTokenInstance.setPixelForSale(1,{from: accounts[1]});

        //try to buy a pixel "for sale" with the wrong receiver address
        await tryCatch(PixelTokenInstance.buyPixelForSale(1, accounts[0], 10, {from: accounts[2]}), errTypes.revert);

        //try to buy a pixel "for sale" with the wrong amount
        await tryCatch(PixelTokenInstance.buyPixelForSale(1, accounts[1], 5, {from: accounts[2]}), errTypes.revert);

        // try to buy a pixel not "for sale"
        await tryCatch(PixelTokenInstance.buyPixelForSale(2, accounts[1], 10, {from: accounts[2]}), errTypes.revert);
        
        //buy a pixel for sale
        await PixelTokenInstance.buyPixelForSale(1, accounts[1], 10, {from: accounts[2]});

        //veriy that the pixel bought is not anymore on pixelForSale's mapping
        pixelForSale_mapping = await PixelTokenInstance.pixelForSale(1);
        assert.equal(pixelForSale_mapping.id, 0);   //id=0 means that the pixel is not existing in the mapping
        
    })
})