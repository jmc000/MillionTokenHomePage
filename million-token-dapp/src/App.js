import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS } from './config.js';
import PixelToken_json from './PixelToken.json'
// import CONTRACT_ADDRESS from './contract_address.json'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      nbOfPixels: 999,
      lines: 999
    }
  }
  
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "htpp://localhost:8545")
    Web3.givenProvider.enable()
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})

    //load the smart contract
    var myContract = new web3.eth.Contract(PixelToken_json.abi, PIXEL_TOKEN_ADDRESS);
    // this.setState({ pixelToken })
    console.log("\n")
    const nbOfPixels = await myContract.methods.nbOfPixels().call().then((a)=>{console.log(a);}).catch((error)=>{console.log("\n")})
    console.log("nbOfPixels:", nbOfPixels)
    this.setState({ nbOfPixels: nbOfPixels})

    const abc = await myContract.methods.lignesPixelImage().call().then((a)=>{console.log(a);}).catch((error)=>{console.log("\n")})
    console.log("_ abc _",abc)
    this.setState({ lines: abc})
  }

  componentWillMount() {
    this.loadBlockchainData()
  }
 

  render() {
    return(
      <div className="container">
        <h1>Hello, world!</h1>
        <p>Your account: {this.state.account}</p>
        <p>Number of pixels: {this.state.nbOfPixels}</p>
        <p>Number of lines: {this.state.lines}</p>
      </div>
    );
  }

}



export default App;
