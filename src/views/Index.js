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
// reactstrap components
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import Header from "components/Headers/Header.js";
import Map from "components/Map/Map.js";
import OrganisationRegistration from "components/Forms/OrganisationRegistration.js";
import SeniorCitizenRegistration from "components/Forms/SeniorCitizenRegistration.js";
import VolunteerRegistration from "components/Forms/VolunteerRegistration.js";
import config from "config/config";

// core components

const organisationOptions = [
  { value: '', label: 'Select Organisation' },
  { value: 'Greendream', label: 'Greendream' },
  { value: 'Other', label: 'Other' }
];

class Index extends React.Component {

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
    const loggedIn = localStorage.getItem(config.userIdStorageKey);
    return (
        <>
          <Header/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0"
                   xl={loggedIn ? 12 : 8}>
                <Map/>
              </Col>
              {
                loggedIn ? null :
                    <Col xl="4">
                      {this.getCard('Request Help', <SeniorCitizenRegistration organisationOptions={organisationOptions}/>)}
                    </Col>
              }
            </Row>
            {
              loggedIn ? null :
                  <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                      {this.getCard('Become a Volunteer', <VolunteerRegistration organisationOptions={organisationOptions}/>)}
                    </Col>
                    <Col xl="4">
                      {this.getCard('Contact the admin', <><p>If you are an organisation and would
                        like to be a part of the efforts in here, please drop your details here. We
                        will
                        get back to you.</p> <OrganisationRegistration/></>)}
                    </Col>
                  </Row>
            }
          </Container>
        </>
    );
  }
}

export default Index;
