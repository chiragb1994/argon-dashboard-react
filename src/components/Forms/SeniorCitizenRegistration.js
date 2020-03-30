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
import config from "config/config";
import {NotificationContainer, NotificationManager} from "react-notifications";

const defaultData = {
  request: {
    name: '',
    mobile: '',
    age: '',
    address: '',
    comments: '',
    lat: '',
    long: '',
    checked: ''
  },
  isSubmitClicked: false
};

class SeniorCitizenRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
    this.updateData = this.updateData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateData(event, field) {
    const {request} = this.state;
    request[field] = event.target.value;
    if (field === 'checked') {
      request[field] = event.target.checked;
    }
    this.setState({request: request, isSubmitClicked: false});
  }

  isSubmitDisabled() {
    const {request, isSubmitClicked} = this.state;
    return isSubmitClicked || !request.name || !request.mobile || !request.age || !request.address
        || !request.checked;
  }

  submitData(event) {
    this.setState({isSubmitClicked: true});
    const {request} = this.state;
    const {isGeolocationAvailable, isGeolocationEnabled, coords} = this.props;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      request.lat = coords.latitude;
      request.long = coords.longitude;
    }
    const requestOptions = {
      method: 'POST'
    };
    fetch(config.requestEndpoint
        + '?name=' + request.name
        + '&mob_number=' + request.mobile
        + '&age=' + request.age
        + '&address=' + request.address
        + '&request=' + request.comments
        + '&latitude=' + request.lat
        + '&longitude=' + request.long,
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
    const {request} = this.state;
    return (
        <Form role="form">
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"
                             value={request.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"
                             type="text"
                             value={request.mobile}
                             onChange={e => this.updateData(e, 'mobile')}/>
          <FormGroupTemplate iconClass="fas fa-user-clock" placeholder="Age" type="text"
                             value={request.age}
                             onChange={e => this.updateData(e, 'age')}/>
          <FormGroupTemplate iconClass="fas fa-address-card"
                             placeholder="Location (be as precise as possible)"
                             value={request.address}
                             onChange={e => this.updateData(e, 'address')}/>
          <FormGroupTemplate iconClass="fas fa-comments" placeholder="Any Special Instructions"
                             type="textarea"
                             value={request.comments}
                             onChange={e => this.updateData(e, 'comments')}/>
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
                id="seniorCitizenCheck"
                type="checkbox"
                checked={request.checked}
                onChange={e => this.updateData(e, 'checked')}/>
            <label className="custom-control-label" htmlFor="seniorCitizenCheck">
              <span className="text-muted">I understand my details can be used to connect me with available volunteers.</span>
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
})(SeniorCitizenRegistration);