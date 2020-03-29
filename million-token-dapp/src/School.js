import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

const center = {
    "textAlign": "center"
}

function School(){
    return(
        <div>
             <main className="container">
            <br/>  
             <h1 className="center"><a href="https://www.esilv.fr/en/" className="aEsilv">ESILV</a> - Leonard de Vinci Graduate School of Engineering</h1>  
             <br/><h3 className="center">The Industrial Innovation Project 4 (PI²), takes place in the second year of the engineering cycle at ESILV, a general engineering school at the heart of digital technologies.</h3>
             <br/>   
                <div className="textCenter">
                <iframe width={650} height={400} src="https://www.youtube.com/embed/CLbJ6h8G5DQ" frameBorder={0} allowFullScreen />&gt;
                </div>
                <br />
                <div className="displayFelx">
                    <h2>Purpose</h2>
                    <div>Apply the skills of his teaching major. This project takes place in the 4th year of the engineering school’s 5-year curriculum. Equivalent to about a hundred hours per student, it involves a team of 4 students working on a concrete problem, usually proposed by a company or a research laboratory.</div>
                    <br/><br/><h2>Expected Competencies</h2>
                    <div>
                        <ul>
                            <li>Know how to apply a project methodology.</li>
                            <li>Develop his technical skills.</li>
                            <li>Animate and motivate a multidisciplinary team.</li>
                        </ul>
                    </div>
                </div>
            </main>
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


export default School;
