import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
//import * as MapsAPI from './Map.js';
import './App.css';
//import google from "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI&callback=initMap";

// const PLACE= {
//   address: 'Vicente de Carvalho, Rio de Janeiro, Brazil',
//   position: {
//     latitude: -22.8558216,
//     longitude: -43.315785
//   }
// }

const APIKEY = "AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI";

//const INITIAL_ZOOM = 14;

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  componentDidMount(){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI')
    .then(res => res.json() )
    .then(res => console.log(res) )
  }

  //carioca mall
  // -22.8504633
  //-43.3110845,15
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: '100vw',
      height: '100vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <Map
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 16 }
        initialCenter = {{ lat: -22.8544633, lng: -43.3160845 }}
      >

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Carioca Mall' }
          position = {{ lat: -22.8504633, lng: -43.3110845 }}
          name = { 'Carioca Mall' }
        />

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'VdC Bus Station' }
          position = {{ lat: -22.8533234, lng: -43.313545 }}
          name = { 'VdC Bus Station' }
        />

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'VdC Subway Station' }
          position = {{ lat: -22.8540158, lng: -43.3131266 }}
          name = { 'VdC Subway Station' }
        />

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Unidos - Small Supermarket' }
          position = {{ lat: -22.8544703, lng: -43.31541745 }}
          name = { 'Unidos - Small Supermarket' }
        />

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Mundial - Big Supermarket' }
          position = {{ lat: -22.8550179, lng: -43.3240954 }}
          name = { 'Mundial - Big Supermarket' }
        />

        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <span>{this.state.activeMarker.title}</span>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: APIKEY
})(GoogleMapsContainer)
