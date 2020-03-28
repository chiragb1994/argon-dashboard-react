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
/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
// reactstrap components
import {Button, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {geolocated} from "react-geolocated";
import Form from "reactstrap/lib/Form";
import FormGroupTemplate from "./FormGroupTemplate";
import NumberFormat from 'react-number-format';

class SeniorCitizenRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  getLatLong() {
    const {isGeolocationAvailable, isGeolocationEnabled, coords, positionError} = this.props;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      return (
          <>
            <NumberFormat value={coords.latitude} displayType='text' decimalScale='6'/>{', '}
            <NumberFormat value={coords.longitude} displayType='text' decimalScale='6'/>
          </>
      )
    } else if (positionError) {
      return positionError.message
    } else {
      return 'Unable to get location'
    }
  }

  render() {
    return (
        <Form role="form">
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"/>
          <FormGroupTemplate iconClass="fas fa-user-clock" placeholder="Age" type="number"/>
          <FormGroupTemplate iconClass="fas fa-address-card"
                             placeholder="Location (be as precise as possible)"/>
          <FormGroupTemplate iconClass="fas fa-comments" placeholder="Any Special Instructions"
                             type="textarea"/>
          <FormGroup>
            <InputGroup className="input-group-alternative mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-location-arrow"/>
                </InputGroupText>
              </InputGroupAddon>
              {this.getLatLong()}
            </InputGroup>
          </FormGroup>
          <div className="text-center">
            <Button className="mt-4" color="primary" type="button">
              Submit
            </Button>
          </div>
        </Form>
    )
        ;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: false,
  userDecisionTimeout: 5000,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true
})(SeniorCitizenRegistration);