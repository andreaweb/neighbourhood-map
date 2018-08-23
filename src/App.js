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
      places: [
        // {
        //   title: 'Carioca Mall', 
        //   name: 'Carioca Mall', 
        //   position: { lat: -22.8504633, lng: -43.3110845 },
        //   fourSquareID: '4bb667511344b713c6739d04'
        // },
        // {
        //   title: 'VdC Bus Station', 
        //   name: 'VdC Bus Station', 
        //   position: { lat: -22.8533234, lng: -43.313545 },
        //   fourSquareID: '53878771498e2936ab8b9df2'
        // },
        // {
        //   title: 'VdC Subway Station', 
        //   name: 'VdC Subway Station', 
        //   position: { lat: -22.8540158, lng: -43.3131266 }, 
        //   fourSquareID: '4c49891420ab1b8dec01e516'
        // },
        // {
        //   title: 'Unidos - Small Supermarket', 
        //   name: 'Unidos - Small Supermarket', 
        //   position: { lat: -22.8544703, lng: -43.31541745 },
        //   fourSquareID: '50521bdce4b0cccd4f20fb51'
        // },
        // {
        //   title: 'Mundial - Big Supermarket', 
        //   name: 'Mundial - Big Supermarket', 
        //   position: { lat: -22.8550179, lng: -43.3240954 },
        //   fourSquareID: '4e22f213d22d0a3f5a0714d1'
        // },
        // {
        //   title: 'Sesi - Swimming Pool', 
        //   name: 'Sesi - Swimming Pool', 
        //   position: { lat: -22.8516601, lng: -43.3193636 },
        //   fourSquareID: '4e1f72ebd22d0a3f59e3a28d'
        // }
      ]
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  componentDidMount(){
    const proxyUrl = "https://shielded-hamlet-43668.herokuapp.com/"; //have to use this to avoid CORS error
    fetch(
        proxyUrl+
        'https://api.yelp.com/v3/businesses/search?term=coffee&latitude=-22.8544633&longitude=-43.3160845',
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
          let results = res.json(); console.log(results); return results
        }
      )
      .then(
        data => {
          let mapData = data;
          console.log(data.businesses) 
          this.setState({ 
            "places": data.businesses
            // update(this.state.places, { 
            //     [key]: { 
            //       $set: {...this.state.places[key],
            //         'name' : data.businesses[key].is_closed,
            //         'imageUrl': data.businesses[key].is_closed,
            //         'isClosed': data.businesses[key].is_closed,
            //         'price': data.businesses[key].is_closed
            //       } 
            //     }
            // }) 
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

  onMapClick(){
    // console.log(this)
    // console.log(this.center)
    // console.log(this.places)
    // this.center = this.places[0].position
    console.log(this.google.maps.event)
    this.google.maps.event.trigger('click')
    // if (this.state.showingInfoWindow) {
    //   this.setState({
    //     showingInfoWindow: false,
    //     activeMarker: null
    //   });
    // }
  }

  centerMarker = (query) => {
    console.log(query)
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
          let results = res.json(); console.log(results); return results
        }
      )
      .then(
        data => {
          let mapData = data;
          console.log(data.businesses) 
          this.setState({ 
            "places": data.businesses
            // update(this.state.places, { 
            //     [key]: { 
            //       $set: {...this.state.places[key],
            //         'name' : data.businesses[key].is_closed,
            //         'imageUrl': data.businesses[key].is_closed,
            //         'isClosed': data.businesses[key].is_closed,
            //         'price': data.businesses[key].is_closed
            //       } 
            //     }
            // }) 
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
   // console.log(this.state.places[key])

       // this.state.activeMarker ?
    //   null
    // :
    //   this.setState({ 
    //     "activeMarker": update(this.state.activeMarker, { 
    //    //     [key]: { 
    //           $set: {
    //             //...this.state.activeMarker
    //             'position' : this.state.places[key].position
    //           } 
    //      //   }
    //      }) 
    //   })

    //this.setState({ activeMarker.position: this.state.places[key].position })
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
       onClick = { this.onMapClick }
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
                  marker = { this.state.activeMarker }
                  visible = { this.state.showingInfoWindow }>
                  <h3>{place.name}</h3>
                  { place.imageUrl 
                    ? <img src={place.imageUrl} height='50'/>
                    : null
                  }
                  <p>
                    Price Range: { place.price }
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
              //this.setState({arr: nextProps.books.filter(book => book.shelf === this.props.bookshelvesValues[this.props.index])})
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

          <Filter {...this.state} centerPlace={(key) => this.centerMarker(key)}/>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: APIKEY
})(GoogleMapsContainer)
