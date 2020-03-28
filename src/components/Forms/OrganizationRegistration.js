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

class OrganizationRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Form role="form">
          <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"/>
          <FormGroupTemplate iconClass="fas fa-users" placeholder="Organization Name"/>
          <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"/>
          <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"/>
          <FormGroupTemplate iconClass="fas fa-comments" placeholder="Comments" type="textarea"/>
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

export default OrganizationRegistration;