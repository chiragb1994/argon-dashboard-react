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
import {Link} from "react-router-dom";
// nodejs library to set properties for components
// reactstrap components
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from "prop-types";

class UserDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, dropDownToggleClassName} = this.props;
    return (
        <Nav className={className} navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className={dropDownToggleClassName} nav>
              <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <i className="fas fa-user" />
                    </span>
                <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Jessica Jones
                      </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
    )
        ;
  }
}

UserDropDown.defaultProps = {
  dropDownToggleClassName: ""
};

UserDropDown.propTypes = {
  className: PropTypes.string,
  dropDownToggleClassName: PropTypes.string
};

export default UserDropDown;