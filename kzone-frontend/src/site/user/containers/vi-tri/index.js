import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import ReactDOM from "react-dom";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"
import Iframe from 'react-iframe'
import Banner from "../../components/Banner";




function App(props) {
    return ( 
        <Main>
        <Banner  title="Bản Đồ Vị Trí" />
        <div className="body">
        <Iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29831.219119488807!2d106.70456335159635!3d20.835647721392487!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfd76a27ff766bf11!2sThe%20Star%20Hotel%20Hai%20Phong!5e0!3m2!1svi!2s!4v1633689075617!5m2!1svi!2s" 
        width="1200px" height="600px" style="border:0;" allowfullscreen="" loading="lazy"></Iframe>  
        </div>
                 
        </Main>
        
      
    );
}

  export default connect()(App);
