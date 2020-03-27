import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS } from './config.js';

class Purchase extends Component {

    constructor(props) {
      super(props)
      this.state = {
        account: '',
        nbOfPixels: 999
      }
    }
    
    async loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider || "htpp://localhost:8545")
      Web3.givenProvider.enable()
      const network = await web3.eth.net.getNetworkType()
      console.log("network:",network)
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0]})
  
      //load the smart contract
      var myContract = new web3.eth.Contract(PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS);
      //get the nb of pixels created
      const nbOfPixels = await myContract.methods.nbOfPixels().call()
      this.setState({ nbOfPixels: nbOfPixels})
        
    //   var i;
    //   var j;
    //   for(i=1;i<10;i++){
    //       for(j=1;j<10;j++){
    //         if (i !== 1 && j !== 1){
    //             await myContract.methods.createPixel(i,j,true).send({from: '0x191FC2305d6C98291E68a5bD23908D9036Aa0175'})
    //         }
    //       }
    //   }
    //   const nbOfPixels2 = await myContract.methods.nbOfPixels().call()
    //   this.setState({ nbOfPixels: nbOfPixels2})
    }

    componentWillMount() {
    //   this.loadBlockchainData()
        // this.createPixel()
    }

  
    render() {
      return(
        <div>
            <h1 className="textAlign">Purchases</h1>

            <br/><br/>
            <label for="text">Enter the url to which your pixel will redirect: </label>&nbsp;&nbsp;
            <input type="text" id="text" name="text" accept="integer" width="10"/>
            <br/>
            <label for="text">Enter the message that will appear when someone has the mouse on your Pixel: </label>&nbsp;&nbsp;
            <input type="text" id="text" name="text" accept="integer" width="10"/>
            <br/>
            <label for="file">Import your image file: </label>&nbsp;&nbsp;
            <input type="file" id="file" name="file" accept="image/png, image/jpeg"/>
            <br/><br/><br/>

            <a>
                <button>Cancel</button>
            </a>&nbsp;&nbsp;
            <a><button>Buy</button></a>
            <br/><br/><br/><br/>
            <a>
                <button onClick={createPixel}>Create a Pixel !</button>
            </a>
        </div>
    );
    }
}


async function createPixel(){
    const web3 = new Web3(Web3.givenProvider || "htpp://localhost:8545")
    Web3.givenProvider.enable()
    var i = 1;
    var j = 1;
    var myContract = new web3.eth.Contract(PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS);
    var notAvailablePair = await myContract.methods.pairNotAvailable(i,j).call()
    while(notAvailablePair === true){
        if(j<1000){
            j += 1;
        }
        else{
            i += 1;
            j = 1;
        }
        notAvailablePair = await myContract.methods.pairNotAvailable(i,j).call()
        //TO DO: if i = j = 1000 -> STOP !!!!!!!
    }
    const userAddress = await web3.eth.getAccounts()
    await myContract.methods.createPixel(i,j,true).send({from: userAddress[0]})
    
}



export default Purchase;
