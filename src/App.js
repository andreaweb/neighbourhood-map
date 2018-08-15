import React, { Component } from 'react';
import * as MapsAPI from './Map.js';
import './App.css';
//import google from "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI&callback=initMap";

class App extends Component {
  componentDidMount(){
   console.log(MapsAPI.initMap())
  }

  render() {
    return (
      <div className="App" id="map" style={{"height":"100vh"}}>
        
      </div>
    );
  }
}

export default App;
