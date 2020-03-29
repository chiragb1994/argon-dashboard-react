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
// react plugin used to create maps
import mapBoxGl from "mapbox-gl";
// reactstrap components
// core components

class Map extends React.Component {
  constructor(props) {
    super(props);
    mapBoxGl.accessToken = 'pk.eyJ1IjoiY292aWQxOS1zb3MiLCJhIjoiY2s4YnF1dnZjMGR3czNscWYwNGRtbnU1aSJ9.Ju7HmRcG8xQkaI5WauDbJA';
  }

  componentDidMount() {
    const map = new mapBoxGl.Map({
      container: 'mapDiv',
      style: 'mapbox://styles/covid19-sos/ck8cta3r11axi1io0vjnx6y7s',
      center: [79.08886, 23.373778],
      zoom: 3.25,
      attributionControl: false,
      maxZoom: 13.5
    })
    .addControl(
        new mapBoxGl.NavigationControl({
          showCompass: true
        })
    )
    .addControl(new mapBoxGl.FullscreenControl())
    .addControl(
        new mapBoxGl.AttributionControl({
          compact: true
        })
    )
    .addControl(new mapBoxGl.ScaleControl())
    .addControl(new mapBoxGl.GeolocateControl());
  }

  render() {
    return (
        <div id="mapDiv"/>
    );
  }
}

export default Map;
