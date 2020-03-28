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
// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Container, Form, Row} from "reactstrap";
import Header from "components/Headers/Header.js";
import FormGroupTemplate from "components/Forms/FormGroupTemplate";

class Register extends React.Component {
  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--8" fluid>
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-3">
                    <div className="text-uppercase text-muted text-center mt-2 mb-2">
                      Register
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                      <FormGroupTemplate iconClass="ni ni-hat-3" placeholder="Name"/>
                      <FormGroupTemplate iconClass="fas fa-users" placeholder="Organization Name"/>
                      <FormGroupTemplate iconClass="ni ni-mobile-button" placeholder="Mobile Number"/>
                      <FormGroupTemplate iconClass="ni ni-email-83" placeholder="Email" type="email"/>
                      <FormGroupTemplate iconClass="ni ni-lock-circle-open" placeholder="Password" type="password"/>
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="button">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}

export default Register;
