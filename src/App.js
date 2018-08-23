import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
//import * as MapsAPI from './Map.js';
import update from 'immutability-helper';
import axios from 'axios';
import {Filter} from './Filter';
import './App.css';

const APIKEY = "AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI";

const config = {
  headers: {'Authorization': 'Bearer 4ttyzAYKbHywtXGvfj9gqk0suytrz7YM0-d7BfHJOKFAYgb2BAPzd_-o-JWIFiIm3azIrmRkX5pvZ2wGd3fLzb36YP9BJIHxVjkGvgsVSBpsoofvy35JMCEDXsF-W3Yx'},
  params: {
    term: 'tacos',
    location: 'main 123st'
  }
};

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.apiKey = '4ttyzAYKbHywtXGvfj9gqk0suytrz7YM0-d7BfHJOKFAYgb2BAPzd_-o-JWIFiIm3azIrmRkX5pvZ2wGd3fLzb36YP9BJIHxVjkGvgsVSBpsoofvy35JMCEDXsF-W3Yx'; //yelp
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: []
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  centerMarker(key){
    console.log(key)
    console.log(this.state.places[key])
    // this.setState({ 
    //   showingInfoWindow: true,
    // "activeMarker": update(this.state.activeMarker, { 
    //       $set: {
    //         'position' : { lat: this.state.places[key].coordinates.latitude, lng: this.state.places[key].coordinates.longitude }
    //       } 
    //  }) 
    // })
    console.log(this.state.selectedPlace)
  }

  componentDidMount(){
    this.getYelpData('coffee')
  }

  getYelpData(query){
    const proxyUrl = "https://shielded-hamlet-43668.herokuapp.com/";
    fetch(
        proxyUrl+
        'https://api.yelp.com/v3/businesses/search?term='+query+'&latitude=-22.8544633&longitude=-43.3160845',
        { 
          method: 'GET',
          headers: { 
            Authorization: 
            'Bearer 4ttyzAYKbHywtXGvfj9gqk0suytrz7YM0-d7BfHJOKFAYgb2BAPzd_-o-JWIFiIm3azIrmRkX5pvZ2wGd3fLzb36YP9BJIHxVjkGvgsVSBpsoofvy35JMCEDXsF-W3Yx' 
          } 
        }
    )
    .then(
       res => {
        let results = res.json(); return results
      }
    )
    .then(
      data => {
        let mapData = data;
        this.setState({ 
          "places": data.businesses
        })
        console.log(); 
        console.log();
        console.log(); 
        return mapData
      }
    )
    .catch(
        error => console.log(error)
    )
  }

  updateQuery = (query) => {
    console.log(query)
    this.getYelpData(query)
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
        {...this.state}
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        initialCenter = {{ lat: -22.8544633, lng: -43.3160845 }}
        zoom = { 13 }
        center = { 
          this.state.activeMarker.position 
          ? this.state.activeMarker.position 
          : { lat: -22.8544633, lng: -43.3160845 } 
        }
      >

        { this.state.places 
          ? this.state.places.map (
          (place, key) => (
              <Marker key={key}
                onClick = { this.onMarkerClick }
                title = { place.title }
                position = {{ lat: place.coordinates.latitude, lng: place.coordinates.longitude }}
                name = { place.name }
                visible={ true }
                phone = { place.display_phone }
                isClosed = { place.is_closed }
                rating = { place.rating }
                imageUrl = { place.image_url }
                price = { place.price }
              >
                <InfoWindow
                  visible = { this.state.showingInfoWindow }>
                  <h3>{place.name}</h3>
                  { place.imageUrl 
                    ? <img src={place.imageUrl} height='50'/>
                    : null
                  }
                  <p>
                    Price Range: { place.price ? place.price : "Not informed" }
                  </p>
                  <p>
                    { place.isClosed ? "Probably Closed" : "Probably Open" }
                  </p>
                  <p>
                    Rating: {place.rating ? place.rating : "None available. Go to yelp and be the first to rate!"}
                  </p>
                  <p>
                    Phone Number: { place.phone ? place.phone : "Not provided"}
                  </p>
                </InfoWindow>
              </Marker>
            ) 
          ) 
          : null
        }      

          <InfoWindow
            marker = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }>
            <h3>{this.state.activeMarker.name}</h3>
            { this.state.activeMarker.imageUrl 
              ? <img src={this.state.activeMarker.imageUrl} height='50'/>
              : null
            }
            <p>
              Price Range: { this.state.activeMarker.price }
            </p>
            <p>
              { this.state.activeMarker.isClosed ? "Probably Closed" : "Probably Open" }
            </p>
            <p>
              Rating: {this.state.activeMarker.rating ? this.state.activeMarker.rating : "None available. Go to yelp and be the first to rate!"}
            </p>
            <p>
              Phone Number: { this.state.activeMarker.phone ? this.state.activeMarker.phone : "Not provided"}
            </p>
          </InfoWindow>

          <Filter {...this.state} centerMarker={(key) => this.centerMarker(key)} updateUserInput={(query) => this.updateQuery(query)}/>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: APIKEY
})(GoogleMapsContainer)
