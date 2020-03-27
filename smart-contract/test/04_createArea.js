// const pixelToken = artifacts.require('PixelToken')

// let tryCatch = require('./exception.js').tryCatch;
// let errTypes = require('./exception.js').errTypes;

// contract('Declare area', function (accounts) {
//     beforeEach('setup contract for each test', async () => {
//         //Deploying contract
//         PixelTokenInstance = await pixelToken.new({from: accounts[0]})

//         // first square (correct one)
//         await PixelTokenInstance.createPixel(22,22,true, {from: accounts[0]});
//         await PixelTokenInstance.createPixel(22,23,true, {from: accounts[0]});
//         await PixelTokenInstance.createPixel(23,22,true, {from: accounts[0]});
//         await PixelTokenInstance.createPixel(23,23,true, {from: accounts[0]});

//         // second square (uncorrect one)
//         await PixelTokenInstance.createPixel(8,8,true, {from: accounts[0]});
//         await PixelTokenInstance.createPixel(15,15,true, {from: accounts[0]});
//         await PixelTokenInstance.createPixel(7,9,true, {from: accounts[0]});
//         await PixelTokenInstance.createPixel(4,10,true, {from: accounts[0]});

//         // accounts[1] own all the 1st square
//         await PixelTokenInstance.buyPixel(1,{from: accounts[1], value: 10});
//         await PixelTokenInstance.buyPixel(2,{from: accounts[1], value: 10});
//         await PixelTokenInstance.buyPixel(3,{from: accounts[1], value: 10});
//         await PixelTokenInstance.buyPixel(4,{from: accounts[1], value: 10});

//         // accounts[1] own all the 2nd square
//         await PixelTokenInstance.buyPixel(5,{from: accounts[2], value: 10});
//         await PixelTokenInstance.buyPixel(6,{from: accounts[2], value: 10});
//         await PixelTokenInstance.buyPixel(7,{from: accounts[2], value: 10});
//         await PixelTokenInstance.buyPixel(8,{from: accounts[2], value: 10});
//     })

//     //First test
//     it('Prevent an uncorrect area declaration', async function () {

//         //check the number of pixels created
//         nbOfPixels = await PixelTokenInstance.nbOfPixels();
//         assert.equal(nbOfPixels, 8)

//         //declare an uncorrect area
//         await tryCatch(PixelTokenInstance.declareArea(5,6,7,8,{from: accounts[2]}), errTypes.revert);
//     })

//     it('Prevent an uncorrect area declaration', async () => {
//         //declare a correct area
//         await PixelTokenInstance.declareArea(1,2,3,4,{from: accounts[1]});

//         //try declaring an area with an untauthorized account
//         // await tryCatch(PixelTokenInstance.declareArea(1,2,3,4,{from: accounts[3]}), errTypes.revert);
//     })

//     it('Check area details', async () => {
//         //declare a correct area
//         await PixelTokenInstance.declareArea(1,2,3,4,{from: accounts[1]});

//         //verify the number od declared areas
//         nbOfAreasDeclared_ = await PixelTokenInstance.nbOfAreasDeclared();
//         assert.equal(nbOfAreasDeclared_,1) 

//         //check the area total price
//         retrievedArea1 = await PixelTokenInstance.areaList(1);
//         totalAreaValue = 10 * 4;
//         assert.equal(retrievedArea1,totalAreaValue)

//         //check area's owner matching with pixel's owner
//         retrievedPixel1 = await PixelTokenInstance.pixelList(1)
//         assert.equal(retrievedArea1.owner, retrievedPixel1.owner)

//         //check area 1 pixels mapping
//         assert.equal(retrievedArea1.pixels[1].id,retrievedPixel1.id)
//     })
// })