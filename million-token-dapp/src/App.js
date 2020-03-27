import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS } from './config.js';
import Nav from './Nav';
import About from './About';
import School from './School';
import Homepage from './Homepage';
import Purchase from './Purchase';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

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
  }

  componentWillMount() {
    this.loadBlockchainData()
  }
 

  render() {
    return(
      <Router>
        <div>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/" exact component={Homepage}/>
              <Route path="/homepage" exact component={Homepage}/>
              <Route path="/purchase" exact component={Purchase}/>
              <Route path="/about" component={About}/>
              <Route path="/school" component={School}/>
            </Switch>
          </div>
          <div className="web3_test">
            {/* <h1>Hello, world!</h1>
            <p>Your account: {this.state.account}</p> */}
            <br/><br/><br/><br/><br/>
            <p>Your ethereum address: {this.state.account}</p>
            <p>Number of pixels: {this.state.nbOfPixels}</p>
          </div>
        </div>
      </Router>
    );
  }

}



export default App;
