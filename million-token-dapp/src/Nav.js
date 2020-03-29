import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { Link, withRouter } from 'react-router-dom';

function Nav() {
    const navStyle = {
        color: 'white'
    };
    const h1Style = {
        fontSize: 25
    };
    const h2Style = {
        fontSize: 15
    };

    return(
        <nav>
            <div>
                <h1 style={h1Style}>The Million Token Dollar Homepage</h1>
                <h2 style={h2Style}>This Dapp is a blockchain-updated version of the famous website the <a href="http://www.milliondollarhomepage.com/" target="_blank" style={navStyle}>MillionDollarHomepage</a>.</h2>
            </div>
            <ul className="nav-links">
                <Link style={navStyle} to='/homepage'>
                    <li>Home page</li>
                </Link>
                <Link style={navStyle} to='/pixelinfo'>
                    <li>Pixel Info</li>
                </Link>
                <Link style={navStyle} to='/purchase'>
                    <li>Purchase</li>
                </Link>
                <Link style={navStyle} to='/school'>
                    <li>School</li>
                </Link>
            </ul>
        </nav>
    );
}


export default Nav;
