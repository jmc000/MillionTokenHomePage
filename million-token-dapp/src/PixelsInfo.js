import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS } from './config.js';

const h2Style = {
    "margin-left": "auto",
    "margin-right": "auto",
    "width": "6em"
}
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

class PixelsInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            account: '',
            nbOfPixelsOwn: '',
            pixelsList: [],
            pixelsAvailableForSale: [],
            pixelId: '',
            forSale: false,
            nbOfPixelsCreated : 0,
            pixelIdChanged: '',
            newPrice: 0
            
        }
        this.handleChangePriceId = this.handleChangePriceId.bind(this)
        this.handleChangePriceValue = this.handleChangePriceValue.bind(this)
        this.handleChangePixelId = this.handleChangePixelId.bind(this);
        this.handleChangeForSale = this.handleChangeForSale.bind(this);
        this.handleSubmitPrice = this.handleSubmitPrice.bind(this);
        this.handleSubmitSale = this.handleSubmitSale.bind(this);
    }

    async loadUserData(){
        const web3 = new Web3(Web3.givenProvider || "htpp://localhost:8545")
        Web3.givenProvider.enable()
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0]})
        var myContract = new web3.eth.Contract(PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS);

        var nbOfPixelsCreated = await myContract.methods.nbOfPixels().call();
        this.setState({nbOfPixelsCreated: nbOfPixelsCreated})
        var k=0
        var count=0
        var count2=0
        while(k<nbOfPixelsCreated){
            var pixel = await myContract.methods.pixelList(k).call()
            console.log("pixel.owner:",pixel.owner)
            if(pixel.owner === this.state.account){
                // this.pixelsList[count] = k
                // var prevState = this.state.pixelsList;
                let prevState = this.state.pixelsList.slice(); //creates the clone of the state
                prevState[count] = k;
                this.setState({pixelsList: prevState});
                count ++
            }
            var availablePixel = await myContract.methods.pixelForSale(k).call()
            if (availablePixel.id !== '0'){
                let prevState2 = this.state.pixelsAvailableForSale.slice();
                prevState2[count2] = availablePixel.id
                this.setState({pixelsAvailableForSale: prevState2})
                count2 ++
            }
            k++
        }
        this.setState({nbOfPixelsOwn: count})
        console.log(this.state.pixelsAvailableForSale)

    };

    handleChangePriceId(event) {
        this.setState({pixelIdChanged: event.target.value});
    }
    handleChangePriceValue(event) {
        this.setState({newPrice: event.target.value});
    }
    handleChangePixelId(event) {
        this.setState({pixelId: event.target.value});
    }
    handleChangeForSale(event) {
        this.setState({forSale: event.target.value});
    }
    handleSubmitSale(event) {
        alert('Accept the tx in Metamask if you want to finalize the operation.');
        event.preventDefault();
        this.putUpPixelForSale();
    }
    handleSubmitPrice(event) {
        alert('Accept the tx in Metamask if you want to finalize the operation.');
        event.preventDefault();
        this.changePrice();
    }

    async changePrice(){
        const web3 = new Web3(Web3.givenProvider || "htpp://localhost:8545")
        Web3.givenProvider.enable()
        var myContract = new web3.eth.Contract(PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS);
        const userAddress = await web3.eth.getAccounts()
        await myContract.methods.modifyPixelPrice(this.state.pixelIdChanged,this.state.newPrice).send({from: userAddress[0]})
    }
    async putUpPixelForSale(){
        const web3 = new Web3(Web3.givenProvider || "htpp://localhost:8545")
        Web3.givenProvider.enable()
        var myContract = new web3.eth.Contract(PIXEL_TOKEN_ABI, PIXEL_TOKEN_ADDRESS);
        const userAddress = await web3.eth.getAccounts()
        await myContract.methods.setPixelForSale(this.state.pixelId).send({from: userAddress[0]})
    }

    componentWillMount(){
        this.loadUserData()
    }

    render(){
        return(
            <div>
                <br/><br/>
                <div style={labelStyle}>
                    <h2>My Pixels Information</h2>
                    <p><strong>Your address: </strong>{this.state.account}</p>
                    <p><strong>Pixels you own: </strong>{this.state.nbOfPixelsOwn}</p>
                    <p><strong>The id of your pixels are: </strong>{
                            this.state.pixelsList.length ? this.state.pixelsList.map((itemTestArray) =>
                            (<span> {itemTestArray},</span>)) : '-'
                            }
                        </p>
                </div>

                <br/><br/>
                <div style={labelStyle}>
                    <h2 srtyle={h2Style}>Change the price of your pixels</h2>
                    <form onSubmit={this.handleSubmitPrice}>
                        <label >
                            Pixel id:
                            <input style={inputStyle} placeholder="[1;1000000]" type="number" min="1" max="1000000" required value={this.state.pixelIdChanged} onChange={this.handleChangePriceId}/>
                        </label><br/>
                        <label>
                            New price:
                            <input style={inputStyle} placeholder="Price in wei !" type="number" min="1" max="10000000000000000" required value={this.state.newPrice} onChange={this.handleChangePriceValue}/>
                        </label><br/>
                        <input style={submitStyle} type="submit" value="Put up for sale"/>
                    </form>
                </div>

                <br/><br/>
                <div style={labelStyle}>
                    <h2>Put up one of my pixel for sale</h2>
                    <form onSubmit={this.handleSubmitSale}>
                        <label >
                            Pixel id:
                            <input style={inputStyle} placeholder="[1;1000000]" type="number" min="1" max="1000000" required value={this.state.pixelId} onChange={this.handleChangePixelId}/>
                        </label><br/>
                        <label>
                            Put up for sale:
                            <select style={inputStyle} required value={this.state.forSale} onChange={this.handleChangeForSale}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </label><br/>
                        <input style={submitStyle} type="submit" value="Put up for sale"/>
                    </form>
                </div>


                <br/><br/>
                <div style={labelStyle}>
                    <h2 srtyle={h2Style}>Pixels available for sale</h2>
                    <p><strong>Id of pixels available for sale: </strong>{
                            this.state.pixelsAvailableForSale.length ? this.state.pixelsAvailableForSale.map((itemTestArray) =>
                            (<span> {itemTestArray},</span>)) : '-'
                            }
                        </p>
                </div>

                <br/><br/>
                <div style={labelStyle}>
                    <h2>Help the community !</h2>
                    <p>
                    For reasons of cost of Gas, we could not create the 1 million pixels directly in the smart contract constructor.
                    So, if you want to help us or if there are not enough pixels available for sale and the maximum number has not been reached (1 million), you can click on the if button below to create a pixel.
                    <br/><br/><div className="disclaimer">Disclaimer: the pixel created will not be yours, you have to buy it after creation succeeded if you want ton own it.</div>
                    </p>
                    <div  className="textCenter"><button onClick={createPixel}>Create a Pixel !</button></div>
                </div>

                <br/><br/>
                <footer className="footerStyle">
                    <br/>
                    <address title="contact">
                        <a>You contact contact us by</a> <a href="martincocher.jeremy@gmail.com"> mail</a>
                        <br/>
                        <a>You can have a look to our </a> <a href="https://github.com/GROOOOAAAARK/OneMillionDollarProject/tree/jeremy" target="blank">github repesitory</a>
                    </address>
                    <br/>
                </footer>
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
    await myContract.methods.createPixel(i,j,false).send({from: userAddress[0]})
    
}


export default PixelsInfo;
