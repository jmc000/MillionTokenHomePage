import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS } from './config.js';


const labelStyle = {
    "borderRadius":"5px","backgroundColor":"#f2f2f2","padding":"15px",
    "margin":"auto","width":"50%"
};
const inputStyle = {
    "width":"100%",
    "padding":"12px 20px",
    "margin":"8px 0",
    "display":"inline-block",
    "border":"1px solid #ccc",
    "borderRadius":"4px",
    "boxSizing":"border-box"
}
const submitStyle = {
    "width":"100%",
    "backgroundColor":"#585C6B",
    "color":"white",
    "padding":"14px 20px",
    "margin":"8px 0",
    "border":"none",
    "borderRadius":"4px",
    "cursor":"pointer"
}


class Purchase extends Component {

    constructor(props) {
      super(props)
      this.state = {
        urlLink: '',
        mouseMsg: '',
        lineCoord: '',
        colCoord: '',
        account: '',
        nbOfPixels: 999,
        pixelId: '',
        pixelsAvailableForSale: []
      }

        // this.handleLineChange = this.handleLineChange.bind(this);
        // this.handleColChange = this.handleColChange.bind(this);
        this.handlePixelChange = this.handlePixelChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleMsgChange = this.handleMsgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        
      var k=0
      var count=0
      while(k < nbOfPixels){
        var availablePixel = await myContract.methods.pixelForSale(k).call()
        if (availablePixel.id !== '0'){
            let prevState2 = this.state.pixelsAvailableForSale.slice();
            prevState2[count] = availablePixel.id
            this.setState({pixelsAvailableForSale: prevState2})
            count ++
        }
        k++
      }
        
    }

    handleColChange(event) {
        this.setState({colCoord: event.target.value});
    }
    handleLineChange(event) {
        this.setState({lineCoord: event.target.value});
      }
    handleUrlChange(event) {
        this.setState({urlLink: event.target.value});
      }
    handleMsgChange(event) {
    this.setState({mouseMsg: event.target.value});
    }
    handlePixelChange(event) {
        this.setState({pixelId: event.target.value});
    }

    handleSubmit(event) {
        alert('To finalize the process please accept the metamask tx.' + this.state.value);
        event.preventDefault();
        this.buyPixel();
      }

    componentWillMount() {
        this.loadBlockchainData()
        // this.createPixel()
    }

    async buyPixel(){
        const web3 = new Web3(Web3.givenProvider || "htpp://localhost:8545")
        Web3.givenProvider.enable()
        var myContract = new web3.eth.Contract(PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS);
        const userAddress = await web3.eth.getAccounts()
        // const pixelId = await myContract.methods.searchTokenByCoord(this.state.lineCoord,this.state.colCoord).call()
        console.log("pixelId:",this.state.pixelId)
        await myContract.methods.buyPixel(this.state.pixelId).send({from: userAddress[0], value: web3.utils.toWei('1', 'shannon')})
    }
   
    render() {
      return(
        <div>
            <br/>
            <br/><br/>
                <div style={labelStyle}>
                    <h2>Pixels available for sale</h2>
                    <p><strong>Id of pixels available for sale:</strong> {
                            this.state.pixelsAvailableForSale.length ? this.state.pixelsAvailableForSale.map((itemTestArray) =>
                            (<span> {itemTestArray},</span>)) : '-'
                            }
                        </p>
                </div>
            
                <br/><br/>
            <form style={labelStyle} onSubmit={this.handleSubmit}>
                <h1 className="textAlign">Buy a pixel</h1>
                <label >
                    Pixel id:
                    <input style={inputStyle} type="number" min="1" max="1000000" required value={this.state.pixelId} onChange={this.handlePixelChange}/>
                </label><br/>
                <label>
                    Enter the url to which your pixel will redirect:
                    <input style={inputStyle} type="url" required value={this.state.urlLink} onChange={this.handleUrlChange} />
                </label><br/>
                <label>
                    Enter the message that will appear when someone has the mouse on your Pixel:
                    <input style={inputStyle} type="text" required value={this.state.mouseMsg} onChange={this.handleMsgChange} />
                </label><br/>
                <input style={submitStyle} type="submit" value="Buy pixel"/>
            </form>

            <br/><br/>
            <footer className="footerStyle">
                <br/>
                <address title="contact">
                    <a>You contact contact us by</a> <a href="martincocher.jeremy@gmail.com"> mail</a>
                    <br/>
                    <a>You can have a look to our </a> <a href="https://github.com/GROOOOAAAARK/OneMillionDollarProject/tree/jeremy" target="_blank">github repesitory</a>
                </address>
                <br/>
            </footer>
        </div>
    );
    }
}




export default Purchase;
