import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
//import * as MapsAPI from './Map.js';
import update from 'immutability-helper';
import {Filter} from './Filter';
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
      selectedPlace: {},
      places: [
        {
          title: 'Carioca Mall', 
          name: 'Carioca Mall', 
          position: { lat: -22.8504633, lng: -43.3110845 },
          id: '4c49891420ab1b8dec01e516'
        },
        {
          title: 'VdC Bus Station', 
          name: 'VdC Bus Station', 
          position: { lat: -22.8533234, lng: -43.313545 }
        },
        {
          title: 'VdC Subway Station', 
          name: 'VdC Subway Station', 
          position: { lat: -22.8540158, lng: -43.3131266 }, 
          fourSquareID: '4c49891420ab1b8dec01e516'
        },
        {
          title: 'Unidos - Small Supermarket', 
          name: 'Unidos - Small Supermarket', 
          position: { lat: -22.8544703, lng: -43.31541745 }
        },
        {
          title: 'Mundial - Big Supermarket', 
          name: 'Mundial - Big Supermarket', 
          position: { lat: -22.8550179, lng: -43.3240954 }
        },
        {
          title: 'Sesi - Swimming Pool', 
          name: 'Sesi - Swimming Pool', 
          position: { lat: -22.8516601, lng: -43.3193636 }
        }
      ]
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
   // this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  componentDidMount(){
    //access to array, containing <div>test</div><div>test</div>
  // console.log(this.children); //undefined
  // console.log(React.children);
  // console.log(this.props); //loaded: true, google -> maps


  //should loop through places array and add info about each place
  //info to add: best photo,
    fetch(
      // 'https://api.foursquare.com/v2/venues/search?client_id='+
      // 'LHI4MJ1DNW0OI1AQHGPMW4NR2AXIRROID5BPF4W0HJCA2I1D&client_secret=EIV3JIANCMC0IZ0NEDKF0BM1G2UQWGADOUE4U1OMHMOJUSWJ'+
      // '&v=20180323&limit=10&ll=-22.8544633,-43.3160845&query=metro'
      'https://api.foursquare.com/v2/venues/4c49891420ab1b8dec01e516?client_id='+
      'LHI4MJ1DNW0OI1AQHGPMW4NR2AXIRROID5BPF4W0HJCA2I1D&client_secret=EIV3JIANCMC0IZ0NEDKF0BM1G2UQWGADOUE4U1OMHMOJUSWJ'+
      '&v=20180323'
    )
    .then(
       res => {
        let results = res.json(); console.log(results); return results}
    )
    .then(
      data => {
        let mapData = data; console.log(mapData); 
        this.setState({ 
          "places": update(this.state.places, { 
              [0]: { 
                $set: {...this.state.places[0],
                  'first tip' : data.response.venue.tips.groups[0].items[0].text,
                  'Status': data.response.venue.popular.richStatus.text,
                  'Phone Number': data.response.venue.contact.formattedPhone
                } 
              }
            }) 
        })
        console.log("First tip: "+data.response.venue.tips.groups[0].items[0].text); 
        console.log("Status: "+data.response.venue.popular.richStatus.text);
        console.log("Phone Number: "+data.response.venue.contact.formattedPhone); 
        return mapData
      }
    )
    .catch(
        error => console.log(error)
    );
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI')
    // .then(res => res.json() )
    // .then(res => console.log(res) )
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  toggleMarker = (key) => {
    //should toggle visible = true or false in Marker with same key... but this doesn't seem allowed in React
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
      //  onClick = { this.onMapClick }
        zoom = { 16 }
        initialCenter = {{ lat: -22.8544633, lng: -43.3160845 }}
      >

      { this.state.places.map (
        (place, key) => (
            <Marker key={key}
              onClick = { this.onMarkerClick }
              title = { place.title }
              position = { place.position }
              name = { place.name }
              visible={ true}
            />
          )
        )
        
      }      

        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <span>{this.state.activeMarker.title}</span>
        </InfoWindow>

        <Filter {...this.state} togglePlace={(key) => this.toggleMarker(key)}/>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: APIKEY
})(GoogleMapsContainer)
