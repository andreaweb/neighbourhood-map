import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { List } from './List';
import './App.css';
import { whyDidYouUpdate } from 'why-did-you-update'

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}

//google maps key
const APIKEY = "AIzaSyAMSLE6fujNqNvj7opx7S3URDb9z_w_HyI";

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    //yelp key
    this.apiKey = '4ttyzAYKbHywtXGvfj9gqk0suytrz7YM0-d7BfHJOKFAYgb2BAPzd_-o-JWIFiIm3azIrmRkX5pvZ2wGd3fLzb36YP9BJIHxVjkGvgsVSBpsoofvy35JMCEDXsF-W3Yx'; //yelp
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: [],
      currentKey: null,
      markers: [],
      query: 'coffee',
      listVisible: true
    }
  }

  onMarkerClick = (props, marker, e) => { /*opens infowindow when there's a click on a marker or its button on the list*/
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  centerMarker(key, e){ /* "clicks" on a marker by finding it through its id and comparing to the list's place's id */
    const arrMarkers = this.state.markers.find(
      marker => marker.props.id === e.target.id
    )
    e.stopPropagation()
    this.onMarkerClick(arrMarkers.props, arrMarkers.marker, e)
  }

  createMarker = (marker) => { /*saves ref to markers so I can trigger click on a specific one later */
    if (marker !== null) {
      this.state.markers.push(marker) 
    }
  }

  componentDidMount(){
    /*Gets default data by searching for coffee*/
    this.getYelpData('coffee')
  }

  /*hides and shows menu in mobile/small screens*/
  toggleMenu = () => {
    this.setState({ listVisible: this.state.listVisible ? false : true })
  }

  getYelpData(query){
    this.setState({query: query})
    /* necessary to avoid CORS error */
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
        /*list will NOT be updated if there's no results*/
        if(data.businesses.length > 0){
          this.setState({ 
            "places": data.businesses
          })
        }
      }
    )
    .catch(
        error => console.log(error)
    )
  }

  /*updates query according to user input*/
  updateQuery = (query) => {
    this.getYelpData(query)
  }
  
  render() {
    const style = {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      overflow: 'hidden',
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
        /*removes some distractions we're not gonna use */
        disableDefaultUI = { true }
        /* centers map when there's a click on a marker */
        center = { 
          this.state.activeMarker.position 
          ? this.state.activeMarker.position 
          : { lat: -22.8544633, lng: -43.3160845 } 
        }
        role="application"
      >

        <h1>
          Find the best 
            <input className='random'
            /*user changes query through this input*/
            value={ this.state.query }
            onChange={evt => this.updateQuery(evt.target.value)}
            />
          around Vicente de Carvalho
        </h1>

        <button className="menu" /*show only if the screen is small enough*/ onClick={this.toggleMenu}>
          <i className="burger fa fa-bars"><span> Menu</span></i>
        </button>

      { /* loop through places array as soon as it is populated and creates a marker for every place with its corresponding info */ }
        { this.state.places 
          ? this.state.places.map (
          (place, key) => (
              <Marker key={key}
                onClick = { this.onMarkerClick }
                ref={ this.createMarker }
                position = {{ lat: place.coordinates.latitude, lng: place.coordinates.longitude }}
                name = { place.name }
                id = { place.id }
                visible={ true }
                phone = { place.display_phone }
                isClosed = { place.is_closed }
                rating = { place.rating }
                imageUrl = { place.image_url }
                price = { place.price }
                animation = { 
                  this.state.activeMarker ? (place.id === this.state.activeMarker.id ? '1' : '0') : '0'
                }
              >
              </Marker>
            ) 
          ) 
          : null
        }      

        <InfoWindow /*shown when there's a click on a marker or its button on the List*/
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }>
          <div>
            <h3>{this.state.activeMarker.name}</h3>
            { /*shows image if there is one*/
              this.state.activeMarker.imageUrl 
              ? <img 
                src={ this.state.activeMarker.imageUrl } 
                alt=''
                /*since I am not be able to provide a helpful description, it's better to leave it empty, as just the place name would be repetitive and inconvenient*/ 
                height='50'
                />
              : null
            }
            <p>
              Price Range: { this.state.activeMarker.price ? this.state.activeMarker.price : "Not informed" }
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
            <span style={{fontStyle: 'italic', fontSize: '80%'}}>All places' info are provided by Yelp</span>
          </div>
        </InfoWindow>

        <List {...this.state} visible={this.state.listVisible} centerMarker={(key, e) => this.centerMarker(key, e)} />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: APIKEY
})(GoogleMapsContainer)
