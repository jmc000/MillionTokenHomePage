import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import matrix_image from './images/background_00.jpg';

function Homepage(){
    return(
        <div>
            <br/>
            <center>
                {/* <table style="position:relative; LEFT: 0; TOP: 0; z-index: 0;" border="0" bgcolor="#e1e1e1" cellpadding="0" cellspacing="0" width="1002"> */}
                <table border="0" bgcolor="#e1e1e1" cellpadding="0" cellspacing="0" width="1002">
                    <tbody>
                    <tr><td id="tablebreak" width="1"></td><td width="1000" height="1000" background={matrix_image} valign="top">
                        {/* <tr><td id="tablebreak" width="1"></td><td width="1000" height="1000" background="background_matrix.jpg" valign="top"> */}
                            <div id="f" ></div>
                            {/* <div id="f" style="display:none;font-size:0px;margin:0px;padding:0px;border: #0000ff 2px solid;position: absolute;width:1px;height:1px;z-index:2;"></div> */}
                            {/* <div id="pixels" style="z-index:1"> */}
                            <div id="pixels">
                                <map name="Map" id="Map">
                                    <area onmouseover="d(this)" onmouseout="e(this)" shape="rect" coords="0,0,100,100" href="http://www.esilv.fr/en/" title="ESILV - French Engineering School" target="_blank"/>
                                </map>
                                {/* <img name="twee" id="twee" src="./index_files/image-map.png" width="1000" height="1000" border="0" ismap="" usemap="#Map" style="position: absolute; top: 0px; left: 0px; border: none"/><img name="een" id="een" src="./index_files/image-map(1).png" width="2000" height="2000" border="0" style="position: absolute; top: 0px; left: 0px; clip: rect(0px, 100px, 100px, 0px); border: black 2px solid; background: url(bg20.gif); display:none"/><img src="./index_files/neg.gif" name="neg" id="neg" width="1000" height="1000" style="position:absolute;top:0px;left:0px;display:none"/> */}
                                <img name="twee" id="twee"  width="1000" height="1000" border="0" ismap="" usemap="#Map"/>
                                {/* <img src="./index_files/neg.gif" name="neg" id="neg" width="1000" height="1000"/> */}
                            </div>
                        </td>
                        <td id="tablebreak" width="1"></td>
                    </tr>

                    </tbody>
                </table>
            </center>
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


export default Homepage;
