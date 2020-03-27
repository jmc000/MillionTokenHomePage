const pixelToken = artifacts.require('PixelToken')

let tryCatch = require('./exception.js').tryCatch;
let errTypes = require('./exception.js').errTypes;

contract('Buy First Pixels', function (accounts) {

    //set up before each test
    beforeEach('setup contract for each test', async function () {
        //Deploying contract
        PixelTokenInstance = await pixelToken.new({from: accounts[0]})
        await PixelTokenInstance.createPixel(1,1,true, {from: accounts[0]});
        await PixelTokenInstance.createPixel(6,6,false, {from: accounts[0]});
        
        // create a pixel more expensive
        await PixelTokenInstance.createPixel(500,500,true, {from: accounts[0]});
    })

    //First test
    it('Buy a new pixel', async function () {

        //get the initial balance
        contractInitialBalance = await web3.eth.getBalance(PixelTokenInstance.address);

        //try to buy a pixel not in sale
        await tryCatch(PixelTokenInstance.buyPixel(2,{from: accounts[1], value: 10}), errTypes.revert);
        //try to buy a pixel with not enough money
        await tryCatch(PixelTokenInstance.buyPixel(1,{from: accounts[1], value: 5}), errTypes.revert);
        //buy normaly a pixel
        await PixelTokenInstance.buyPixel(1,{from: accounts[1], value: 10});
        //try to buy a pixel just bought with another account
        await tryCatch(PixelTokenInstance.buyPixel(1,{from: accounts[2], value: 10}), errTypes.revert);

        //try to buy the (500,500) pixel at 10 wei 
        await tryCatch(PixelTokenInstance.buyPixel(3,{from: accounts[2], value: 10}), errTypes.revert);

        //buy the (500,500) pixel at 50 wei
        await PixelTokenInstance.buyPixel(3,{from: accounts[2], value: 50});

        //check new owner
        retrievedPixel1Info = await PixelTokenInstance.pixelList(1);
        assert.equal(retrievedPixel1Info.owner, accounts[1])

        //check final balance
        contractFinalBalance = await web3.eth.getBalance(PixelTokenInstance.address);
        assert.equal(contractFinalBalance, 60) //50 wei + 10 wei of the 2 bought pixels

        //try to buy a pixel not created yet
        await tryCatch(PixelTokenInstance.buyPixel(10,{from: accounts[2], value: 10}), errTypes.revert);

    })

    it('Modify pixel price', async function () {
        //check initial owner 
        retrievedPixel1Info = await PixelTokenInstance.pixelList(1);
        assert.equal(retrievedPixel1Info.owner, accounts[0])

        //check owner after buying
        await PixelTokenInstance.buyPixel(1,{from: accounts[1], value: 10});
        retrievedPixel1Info = await PixelTokenInstance.pixelList(1);
        assert.equal(retrievedPixel1Info.owner, accounts[1])

        //try to modify the price with an unauthorized account
        await tryCatch(PixelTokenInstance.modifyPixelPrice(1, 100,{from: accounts[0]}), errTypes.revert);
        await tryCatch(PixelTokenInstance.modifyPixelPrice(1, 100,{from: accounts[2]}), errTypes.revert);

        //modify the price of a token
        newPrice = 100
        await PixelTokenInstance.modifyPixelPrice(1, newPrice,{from: accounts[1]})
        retrievedPixel1Info = await PixelTokenInstance.pixelList(1);
        assert.equal(retrievedPixel1Info.priceWEI ,newPrice)
    })
})