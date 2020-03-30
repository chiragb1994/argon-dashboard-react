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
import Form from "reactstrap/lib/Form";
import FormGroupTemplate from "./FormGroupTemplate";
import config from "config/config";
import {NotificationManager} from "react-notifications";

const defaultData = {
  organisation: {
    name: '',
    organisationName: '',
    mobile: '',
    email: '',
    comments: ''
  },
  isSubmitClicked: false
};
class OrganizationRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultData;
    this.updateData = this.updateData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateData(event, field) {
    const {organisation} = this.state;
    organisation[field] = event.target.value;
    if (field === 'checked') {
      organisation[field] = event.target.checked;
    }
    this.setState({organisation: organisation, isSubmitClicked: false});
  }

  isSubmitDisabled() {
    const {organisation, isSubmitClicked} = this.state;
    return isSubmitClicked || !organisation.name || !organisation.organisationName || !organisation.mobile || !organisation.email;
  }

  submitData(event) {
    this.setState({isSubmitClicked: true});
    const {organisation} = this.state;
    const requestOptions = {
      method: 'POST'
    };
    fetch(config.orgEndpoint
        + '?name=' + organisation.name
        + '&organisation=' + organisation.organisationName
        + '&mob_number=' + organisation.mobile
        + '&email_id=' + organisation.email
        + '&comments=' + organisation.comments,
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

  render() {
    const {organisation} = this.state;
    return (
        <Form role="form">
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"
                             value={organisation.name}
                             onChange={e => this.updateData(e, 'name')}/>
          <FormGroupTemplate iconClass="fas fa-users" placeholder="Organization Name"
                             value={organisation.organisationName}
                             onChange={e => this.updateData(e, 'organisationName')}/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"
                             value={organisation.mobile}
                             onChange={e => this.updateData(e, 'mobile')}/>
          <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"
                             value={organisation.email}
                             onChange={e => this.updateData(e, 'email')}/>
          <FormGroupTemplate iconClass="fas fa-comments" placeholder="Comments" type="textarea"
                             value={organisation.comments}
                             onChange={e => this.updateData(e, 'comments')}/>

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

export default OrganizationRegistration;