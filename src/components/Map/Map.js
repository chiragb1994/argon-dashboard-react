/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create google maps
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
// reactstrap components
// core components
// mapTypeId={google.maps.MapTypeId.ROADMAP}
const MapWrapper = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{lat: 12.9716, lng: 77.5946}}
            defaultOptions={{
              scrollwheel: false,
              styles: [
                {
                  featureType: "administrative",
                  elementType: "labels.text.fill",
                  stylers: [{color: "#444444"}]
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [{color: "#f2f2f2"}]
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [{visibility: "off"}]
                },
                {
                  featureType: "road",
                  elementType: "all",
                  stylers: [{saturation: -100}, {lightness: 45}]
                },
                {
                  featureType: "road.highway",
                  elementType: "all",
                  stylers: [{visibility: "simplified"}]
                },
                {
                  featureType: "road.arterial",
                  elementType: "labels.icon",
                  stylers: [{visibility: "off"}]
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [{visibility: "off"}]
                },
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: [{color: "#5e72e4"}, {visibility: "on"}]
                }
              ]
            }}
        >
          <Marker position={{lat: 12.9716, lng: 77.5946}}/>
        </GoogleMap>
    ))
);

class Map extends React.Component {
  render() {
    return (
        <MapWrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7bivKN4OXzEKDYN5IYEVap2NXeHCEdlo"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={
              <div
                  style={{height: `300px`}}
                  className="map-canvas"
                  id="map-canvas"
              />
            }
            mapElement={
              <div style={{height: `100%`, borderRadius: "inherit"}}/>
            }
        />
    );
  }
}

export default Map;
