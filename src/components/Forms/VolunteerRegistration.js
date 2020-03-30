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
import {Form, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {geolocated} from "react-geolocated";
import FormGroupTemplate from "./FormGroupTemplate";
import NumberFormat from 'react-number-format';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import config from "config/config";

const defaultData = {
  volunteer: {
    name: '',
    mobile: '',
    email: '',
    address: '',
    lat: '',
    long: '',
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
    return isSubmitClicked || !volunteer.name || !volunteer.mobile || !volunteer.email
        || !volunteer.address
        || !volunteer.checked;
  }

  submitData(event) {
    this.setState({isSubmitClicked: true});
    const {volunteer} = this.state;
    const {isGeolocationAvailable, isGeolocationEnabled, coords} = this.props;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      volunteer.lat = coords.latitude;
      volunteer.long = coords.longitude;
    }
    const requestOptions = {
      method: 'POST'
    };
    fetch(config.volunteerEndpoint
        + '?name=' + volunteer.name
        + '&mob_number=' + volunteer.mobile
        + '&email_id=' + volunteer.email
        + '&address=' + volunteer.address
        + '&latitude=' + volunteer.lat
        + '&longitude=' + volunteer.long,
        requestOptions)
    .then(response => {
      console.log(response);
      return response.statusText;
    })
    .then(data => {
      console.log(data);
      NotificationManager.success(data);
    })
    .catch(error => {
      NotificationManager.error(error.toString());
      this.setState({isSubmitClicked: false});
    });
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
                             value={volunteer.mobile}
                             onChange={e => this.updateData(e, 'mobile')}/>
          <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"
                             value={volunteer.email}
                             onChange={e => this.updateData(e, 'email')}/>
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