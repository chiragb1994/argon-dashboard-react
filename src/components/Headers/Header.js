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
import NumberFormat from 'react-number-format';
// reactstrap components
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import PropTypes from "prop-types";

class Header extends React.Component {

  getCardCol(title, count, iconBg, iconClass) {
    return (
        <Col lg="6" xl="4">
          <Card className="card-stats mb-3 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <span className="h4 text-uppercase text-muted mb-0 card-title">{title}</span>
                  <span className="h4 font-weight-bold mb-0" style={{float: 'right'}}>
                    <NumberFormat value={count} displayType='text' thousandSeparator={true}
                                  thousandsGroupStyle='lakh'/>
                  </span>
                </div>
                {/*<Col className="col-auto">*/}
                {/*  <div className={'icon icon-shape ' + iconBg + ' text-white rounded-circle shadow'}>*/}
                {/*    <i className={'fas ' + iconClass}/>*/}
                {/*  </div>*/}
                {/*</Col>*/}
              </Row>
            </CardBody>
          </Card>
        </Col>
    )
  }

  render() {
    const {showCards} = this.props;
    return (
        <>
          <div className="header bg-gradient-info pb-7 pt-4 pt-md-7 pb-md-8">
            <Container fluid>
              <div className="header-body">
                {/* Card stats */}
                {showCards ?
                    <Row>
                      {this.getCardCol('Volunteers', 314, 'bg-danger', 'fa-chart-bar')}
                      {this.getCardCol('Requests processed', 164, 'bg-warning', 'fa-chart-pie')}
                      {this.getCardCol('Supporting Organizations', 7, 'bg-yellow', 'fa-users')}
                    </Row>
                    : null}
              </div>
            </Container>
          </div>
        </>
    );
  }
}

Header.defaultProps = {
  showCards: true
};

Header.propTypes = {
  showCards: PropTypes.bool
};

export default Header;
