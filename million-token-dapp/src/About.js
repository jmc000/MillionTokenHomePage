import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';


function About() {

    return(
        <div>
            <br/><br/>
            <h1>About page</h1>
            <footer className="footerStyle">
                <br/>
                <address title="contact">
                    <a>You contact contact us by</a> <a href="martincocher.jeremy@gmail.com"> mail</a>
                    <br/>
                    <a>You can have a look to our </a> <a href="https://github.com/GROOOOAAAARK/OneMillionDollarProject">github repesitory</a>
                </address>
                <br/>
            </footer>
        </div>

    );

}


export default About;
