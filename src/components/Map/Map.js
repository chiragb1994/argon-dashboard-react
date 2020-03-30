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
import data from "./data.json";
import {Card, CardBody, CardHeader, Nav, NavItem, NavLink, Row} from "reactstrap";
import classnames from "classnames";
// reactstrap components
// core components

class Map extends React.Component {
  constructor(props) {
    super(props);
    mapBoxGl.accessToken = 'pk.eyJ1IjoiY292aWQxOS1zb3MiLCJhIjoiY2s4YnF1dnZjMGR3czNscWYwNGRtbnU1aSJ9.Ju7HmRcG8xQkaI5WauDbJA';
    this.state = {
      activeNav: 1,
      map: null,
      layerIds: [],
      allData: []
    };
  }

  toggleNavs = (e, index) => {
    this.setState({activeNav: index});
    e.preventDefault();
  };

  componentDidMount() {
    this.updateData();
    this.initiateMap();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.map && this.state.map) {
      this.createSource(this.state.map, this.state.allData);
      this.state.map.on("load", () => this.addMapLayers(this.state.map, this.state.allData));
    }
    if (
        (!prevState.layerIds && this.state.layerIds) ||
        prevState.layerIds !== this.state.layerIds ||
        prevState.activeNav !== this.state.activeNav
    ) {
      this.setLayerVisibility();
    }
  }

  initiateMap() {
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
    this.setState({map: map});
  }

  updateData() {
    const features = data.data.map(d => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [d.lon, d.lat]
        },
        properties: d
      };
    });
    this.setState({
      allData: {
        type: "FeatureCollection",
        features
      }
    });
  }

  createSource(map, allData) {
    map.on("load", () => {
      map.addSource('allData', {
        'type': 'geojson',
        'data': allData
      });
    });
  }

  addMapLayers(map, allData) {
    let layerIds = [];
    allData.features.forEach(function (feature) {
      const type = feature.properties['type'];
      const layerId = 'poi-' + type.toLowerCase();

      if (!map.getLayer(layerId)) {
        map.addLayer({
          'id': layerId,
          'type': 'symbol',
          'source': 'allData',
          'layout': {
            'icon-image': type === 'VOLUNTEER' ? 'volunteer' : 'old',
            'icon-size': 0.07,
            'icon-allow-overlap': true
          },
          'filter': ['==', 'type', type]
        });

        layerIds.push(layerId);
      }
    });
    this.setState({layerIds: layerIds});
  }

  setLayerVisibility() {
    const {activeNav, layerIds, map} = this.state;
    layerIds.forEach(function (layerId) {
      let visibility = 'none';
      if (activeNav === 1 && layerId === 'poi-volunteer') {
        visibility = 'visible';
      }
      if (activeNav === 2 && layerId === 'poi-request') {
        visibility = 'visible';
      }
      map.setLayoutProperty(
          layerId,
          'visibility',
          visibility
      );
    });
  }

  render() {
    return (
        <Card className="bg-gradient-default shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h2 className="text-white mb-0">Overview</h2>
              </div>
              <div className="col">
                <Nav className="justify-content-end" pills>
                  <NavItem>
                    <NavLink
                        className={classnames("py-2 px-3", {
                          active: this.state.activeNav === 1
                        })}
                        href="#"
                        onClick={e => this.toggleNavs(e, 1)}
                    >
                      <span className="d-none d-md-block">Volunteer</span>
                      <span className="d-md-none">V</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        className={classnames("py-2 px-3", {
                          active: this.state.activeNav === 2
                        })}
                        data-toggle="tab"
                        href="#"
                        onClick={e => this.toggleNavs(e, 2)}
                    >
                      <span className="d-none d-md-block">Requests</span>
                      <span className="d-md-none">R</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Row>
          </CardHeader>
          <CardBody className="pre-scrollable">
            <div id="mapDiv"/>
            {/*<iframe src="http://www.thebangaloreguy.com/covid19/COVID_SOS_v0.html" title="map" height="300px"/>*/}
          </CardBody>
        </Card>
    );
  }
}

export default Map;
