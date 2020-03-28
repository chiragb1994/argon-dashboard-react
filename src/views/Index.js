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
// reactstrap components
import {Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row} from "reactstrap";
import Header from "components/Headers/Header.js";
import Map from "components/Map/Map.js";
import OrganizationRegistration from "components/Forms/OrganizationRegistration.js";
import SeniorCitizenRegistration from "components/Forms/SeniorCitizenRegistration.js";
import VolunteerRegistration from "components/Forms/VolunteerRegistration.js";

// core components

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
    };
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
  };

  overviewCard() {
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
          <CardBody className="pre-scrollable">
            <Map/>
          </CardBody>
        </Card>
    )
  }

  getCard(header, body) {
    return (
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h2 className="mb-0">{header}</h2>
              </div>
            </Row>
          </CardHeader>
          <CardBody className="pre-scrollable">
            {body}
          </CardBody>
        </Card>
    )
  }

  render() {
    return (
        <>
          <Header/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                {this.overviewCard()}
              </Col>
              <Col xl="4">
                {this.getCard('Request Help', <SeniorCitizenRegistration/>)}
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="8">
                {this.getCard('Become a Volunteer', <VolunteerRegistration/>)}
              </Col>
              <Col xl="4">
                {this.getCard('Organisations', <><p>If you are an organization and would
                  like to be a part of the efforts in here, please drop your details here. We will
                  get back to you.</p> <OrganizationRegistration/></>)}
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}

export default Index;
