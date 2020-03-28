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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
// core components
import {chartOptions, parseOptions} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Form from "reactstrap/lib/Form";
import Maps from "components/Maps/Maps.js";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
          this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  render() {
    return (
        <>
          <Header/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
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
                                href="#pablo"
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
                                href="#pablo"
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
                  <CardBody>
                    <Maps/>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h2 className="mb-0">Request Help</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfm4ODDs0YtmmT4RzWtkdoJb3_BbjNDDKuEErOJOLsmsLVHeQ/viewform?embedded=true" height="360" frameBorder="0" marginHeight="0" marginWidth="0" title="requestHelp">Loading…
                    </iframe>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Become a Volunteer</h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLScgxYIsX377RUtGd-Ude1p4LQEsUccqkoLNqAjegY0WXMCIvA/viewform?embedded=true" height="360" frameBorder="0" marginHeight="0" marginWidth="0" title="volunteer">Loading…
                    </iframe>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Organisations</h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <p>If you are an organization and would like to be a part of the efforts in here, please drop your details here. We will get back to you.</p>
                    <Form role="form">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Name" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-users" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Organization Name" type="text"/>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Mobile" type="text"/>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Email" type="email"/>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-comments" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Comments" type="comments"/>
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button className="mt-4" color="primary" type="button">
                          Submit
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

export default Index;
