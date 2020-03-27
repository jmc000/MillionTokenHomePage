import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';


function Purchase(){
    const textAlign = {
        textAlign: 'center'
    };

    return(
        <div>
            <h1 style={textAlign}>Purchases</h1>

            <br/><br/>
            <label for="text">Select the number of pixels: </label>
            <input type="text" id="text" name="text" accept="integer"/>
            <br/><br/>

            <label for="file">Import your image file: </label>
            <input type="file" id="file" name="file" accept="image/png, image/jpeg"/>
            <br/><br/><br/>

            <a href="index.html">
                <button>Cancel</button>
            </a>&nbsp;&nbsp;
            <a><button>Buy</button></a>
        </div>
    );
}


export default Purchase;
