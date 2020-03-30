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
import {Button, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {geolocated} from "react-geolocated";
import FormGroupTemplate from "./FormGroupTemplate";
import NumberFormat from 'react-number-format';
import config from "config/config";
import {makeApiCall} from "utils/utils";

const defaultData = {
  volunteer: {
    name: '',
    mob_number: '',
    email_id: '',
    address: '',
    latitude: '',
    longitude: '',
    checked: ''
  },
  isSubmitClicked: false
};

class VolunteerRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
    this.updateData = this.updateData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateData(event, field) {
    const {volunteer} = this.state;
    volunteer[field] = event.target.value;
    if (field === 'checked') {
      volunteer[field] = event.target.checked;
    }
    this.setState({volunteer: volunteer, isSubmitClicked: false});
  }

  isSubmitDisabled() {
    const {volunteer, isSubmitClicked} = this.state;
    return isSubmitClicked || !volunteer.name || !volunteer.mob_number || !volunteer.email_id
        || !volunteer.address
        || !volunteer.checked;
  }

  submitData(event) {
    this.setState({isSubmitClicked: true});
    const {volunteer} = this.state;
    const {isGeolocationAvailable, isGeolocationEnabled, coords} = this.props;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      volunteer.latitude = coords.latitude;
      volunteer.longitude = coords.longitude;
    }
    makeApiCall(config.volunteerEndpoint, 'POST', volunteer);
    event.preventDefault();
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
    const {volunteer} = this.state;
    return (
        <Form role="form">
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Full Name"
                             value={volunteer.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="fab fa-whatsapp" placeholder="WhatsApp Contact Number"
                             type="text"
                             value={volunteer.mob_number}
                             onChange={e => this.updateData(e, 'mob_number')}/>
          <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"
                             value={volunteer.email_id}
                             onChange={e => this.updateData(e, 'email_id')}/>
          <FormGroupTemplate iconClass="fas fa-address-card"
                             placeholder="Location (Mention nearest Maps Landmark - that you specify on apps like Ola, Uber and Swiggy)"
                             value={volunteer.address}
                             onChange={e => this.updateData(e, 'address')}/>
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
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input
                className="custom-control-input"
                id="volunteerCheck"
                type="checkbox"
                checked={volunteer.checked}
                onChange={e => this.updateData(e, 'checked')}/>
            <label className="custom-control-label" htmlFor="volunteerCheck">
              <span className="text-muted">I understand my details can be used to connect me with distressed people who need help.</span>
            </label>
          </div>
          <div className="text-center">
            <Button className="mt-4" color="primary" type="button"
                    disabled={this.isSubmitDisabled()}
                    onClick={e => this.submitData(e)}>
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
})(VolunteerRegistration);