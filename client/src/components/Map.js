import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import BibRest from '../restaurant_bib.json';
const dotenv = require('dotenv');
dotenv.config();

class Map extends Component {
  render(){

    const TheMap = withScriptjs(withGoogleMap(props => (
        <GoogleMap defaultCenter = { { lat: 47.0833, lng: 2.3488 } }
        defaultZoom = { 6 }>
            {BibRest.map(restau => {
                return <Marker key={restau.id} position={restau.geolocalisation} />
            })}
        </GoogleMap>
    )))
    const API_Map = process.env.MAP_API_KEY;
    const MapURL = "https://maps.googleapis.com/maps/api/js?key="+API_Map;
    return(
      <div>
        <TheMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAigMIMTY-1q-L6SvPl65Ab7zEpf9XIomo"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={ <div style={{ height: `calc(100vh - 16vh - 5vh)`, width: '100%' }} /> }
            mapElement={ <div style={{ height: `100%` }} />} />
      </div>
    );
  }
};

export default Map;