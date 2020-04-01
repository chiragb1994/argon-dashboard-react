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
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import Header from "components/Headers/Header.js";

class Information extends React.Component {

  renderImportantInfo(){
    return (
        <Row className="justify-content-center mt-5">
          <Col lg="8" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  Important Information
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5 text-justify">
                <ol className="list-group">
                  <li className="list-group-item">At all points, it is essential that volunteers
                    abiding to tasks take use of masks, gloves and/or hand sanitizers to
                    minimize the exposure to the virus.
                  </li>
                  <li className="list-group-item">With the lockdown in place, the volunteers
                    will be requested to only accept requests within 5-10 minutes of walkable
                    distance from their household. The idea here is very simple. We will map you
                    to your neighbour based on the details filled on the form (refer to group
                    description). When you get your own grocery and medicines, you can get for
                    them too. This way you don't have to travel anywhere extra for helping them.
                    Just pick the packet for them when you pick for yourselves and drop at their
                    doorstep on your way home. It is in interest of everyone that senior
                    citizens do not step out even for buying the essentials irrespective of
                    whether they can or not since they are highly prone to catching the deadly
                    Coronavirus.
                  </li>
                  <li className="list-group-item">Payment for the groceries can be made by the
                    senior citizen to the vendor directly through digital modes or to you - it
                    is your call. Volunteers are not expected to make any financial
                    contribution. However, it is your call if you want to help someone in need.
                  </li>
                  <li className="list-group-item">If at any point, you notice that someone is
                    trying to misuse the platform, we strongly appeal you bring it to the
                    attention to the portal by reaching out to us via the contact us form on the
                    home page.
                  </li>
                </ol>
              </CardBody>
            </Card>
          </Col>
        </Row>
    );
  }

  renderPrivacyPolicy(){
    return (
        <Row className="justify-content-center mt-5">
          <Col lg="8" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  Privacy
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5 text-justify">
                <div className="text-justify mt-2 mb-2">
                  Data collected from Volunteers might be exchanged with requestors (and vice
                  versa) for the purpose of helping each other and the moderators helping in the
                  connection might call or email you in this regard. This data will not be
                  shared or used further.
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
    );
  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              <Col lg="8" md="8">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5 text-justify">
                    <div className="text-uppercase text-center mt-2 mb-2">
                      COVID SOS is a non-profit initiative with the intent to connect distressed
                      individuals with volunteers in lieu of COVID-19.
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {this.renderPrivacyPolicy()}
            {this.renderImportantInfo()}
          </Container>
        </>
    );
  }
}

export default Information;
