import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
//import * as MapsAPI from './Map.js';
import update from 'immutability-helper';
import {Filter} from './Filter';
import './App.css';

const APIKEY = "AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI";

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
          fourSquareID: '4bb667511344b713c6739d04'
        },
        {
          title: 'VdC Bus Station', 
          name: 'VdC Bus Station', 
          position: { lat: -22.8533234, lng: -43.313545 },
          fourSquareID: '53878771498e2936ab8b9df2'
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
          position: { lat: -22.8544703, lng: -43.31541745 },
          fourSquareID: '50521bdce4b0cccd4f20fb51'
        },
        {
          title: 'Mundial - Big Supermarket', 
          name: 'Mundial - Big Supermarket', 
          position: { lat: -22.8550179, lng: -43.3240954 },
          fourSquareID: '4e22f213d22d0a3f5a0714d1'
        },
        {
          title: 'Sesi - Swimming Pool', 
          name: 'Sesi - Swimming Pool', 
          position: { lat: -22.8516601, lng: -43.3193636 },
          fourSquareID: '4e1f72ebd22d0a3f59e3a28d'
        }
      ]
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log(marker)
  }

  componentDidMount(){
    this.state.places.map( (place, key) => (
      fetch(
          // 'https://api.foursquare.com/v2/venues/search?client_id='+
          // 'LHI4MJ1DNW0OI1AQHGPMW4NR2AXIRROID5BPF4W0HJCA2I1D&client_secret=EIV3JIANCMC0IZ0NEDKF0BM1G2UQWGADOUE4U1OMHMOJUSWJ'+
          // '&v=20180323&limit=10&ll=-22.8544633,-43.3160845&query=sesi'
          'https://api.foursquare.com/v2/venues/'+place.fourSquareID+'?client_id='+
          'LHI4MJ1DNW0OI1AQHGPMW4NR2AXIRROID5BPF4W0HJCA2I1D&client_secret=00KOS3HDDFCS2PG3FCG3BL5SG00BPHIFFT5A4QWIRQMSP0YR'+
          '&v=20180323'
        )
        .then(
           res => {
            let results = res.json(); return results}
        )
        .then(
          data => {
            let mapData = data; console.log(key, place.title); 
            this.setState({ 
              "places": update(this.state.places, { 
                  [key]: { 
                    $set: {...this.state.places[key],
                      'firstTip' : data.response.venue.tips.groups[0].items[0].text,
                      'status': data.response.venue.popular.richStatus.text,
                      'phoneNumber': data.response.venue.contact.formattedPhone
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
        )
      )
    )
    
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI')
    // .then(res => res.json() )
    // .then(res => console.log(res) )
  }

  onMapClick(){
    console.log(this)
    console.log(this.center)
    console.log(this.places)
    this.center = this.places[0].position
    // if (this.state.showingInfoWindow) {
    //   this.setState({
    //     showingInfoWindow: false,
    //     activeMarker: null
    //   });
    // }
  }

  centerMarker = (key) => {
    console.log(key)
    console.log(this.state.places[key])
    console.log(this.state.activeMarker.length)
    this.state.activeMarker ?
      null
    :
      this.setState({ 
        "activeMarker": update(this.state.activeMarker, { 
       //     [key]: { 
              $set: {
                //...this.state.activeMarker
                'position' : this.state.places[key].position
              } 
         //   }
         }) 
      })

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
       //onClick = { this.onMapClick }
        zoom = { 16 }
        center = { 
            this.state.activeMarker.position 
            ? this.state.activeMarker.position 
            : { lat: -22.8544633, lng: -43.3160845 } 
          }
      >

        { this.state.places[1].firstTip || this.state.places[2].firstTip 
          ? this.state.places.map (
          (place, key) => (
              <Marker key={key}
                onClick = { this.onMarkerClick }
                title = { place.title }
                position = { place.position }
                name = { place.name }
                visible={ true }
                firstTip = { place.firstTip ? place.firstTip : "Nenhuma dica disponível." }
                phoneNumber = { place.phoneNumber ? place.phoneNumber : "Nenhum telefone informado." }
                status = { place.status ? place.status : "Sem status." }
              />
              //this.setState({arr: nextProps.books.filter(book => book.shelf === this.props.bookshelvesValues[this.props.index])})
            ) 
          ) 
          : null
        }      

          <InfoWindow
            marker = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }>
            <h3>{this.state.activeMarker.title}</h3>
            <p>
              {
                this.state.activeMarker.firstTip
                ? "Dica: " + this.state.activeMarker.firstTip
                : this.state.activeMarker.firstTip
              }
            </p>
            <p>{this.state.activeMarker.status}</p>
            <p>
              {
                this.state.activeMarker.phoneNumber 
                ? "Contato: " + this.state.activeMarker.phoneNumber 
                : this.state.activeMarker.phoneNumber
              }
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
