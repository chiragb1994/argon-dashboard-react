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
import {
  Card,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import config from "config/config";
import {withRouter} from "react-router";
import {makeApiCall} from "../utils/utils";

const tableConfigMap = {
  requests: {
    key: 'requests',
    title: 'Requests',
    fieldHeaders: [
      'Name',
      'Mobile',
      'Address',
      'Request',
      'Age',
      'Status'
    ],
    fieldKeys: [
      'name',
      'mob_number',
      'address',
      'request',
      'age',
      'status'
    ],
    pageSize: 10,
    actions: [{
      key: 'assign',
      name: 'Assign a volunteer'
    }, {
      key: 'change_status',
      name: 'Change Status'
    }]
  },
  volunteers: {
    key: 'volunteers',
    title: 'Volunteers',
    fieldHeaders: [
      'Name',
      'Mobile',
      'Email',
      'Address',
      'Status'
    ],
    fieldKeys: [
      'name',
      'mob_number',
      'email_id',
      'address',
      'status'
    ],
    pageSize: 10,
    actions: [{
      key: 'update_info',
      name: 'Update Info'
    }, {
      key: 'activate_deactivate',
      name: 'Activate/Deactivate'
    }]
  }
};

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currState: {
        requests: {
          data: [],
          filteredData: [],
          currPage: 1,
          searchString: ''
        },
        volunteers: {
          data: [],
          filteredData: [],
          currPage: 1,
          searchString: ''
        }
      }
    };
    if (!localStorage.getItem(config.userIdStorageKey)) {
      this.props.history.push("/");
    }
    this.getData();
    this.search = this.search.bind(this);
  }

  getData() {
    makeApiCall(config.mapAuthEndpoint, 'POST',
        {user_id: localStorage.getItem(config.userIdStorageKey)},
        (response) => {
          this.setState({
            currState: {
              requests: {
                data: response.Requests,
                filteredData: response.Requests,
                currPage: 1,
                searchString: ''
              },
              volunteers: {
                data: response.Volunteers,
                filteredData: response.Volunteers,
                currPage: 1,
                searchString: ''
              }
            }
          });
        }, false);
  }

  search(event, tableConfig) {
    const {currState} = this.state;
    const searchString = event.target.value;
    currState[tableConfig.key].searchString = searchString;
    currState[tableConfig.key].filteredData = currState[tableConfig.key].data.filter(row => {
      let keepRow = false;
      tableConfig.fieldKeys.forEach(fk => {
        if (row[fk].toString().toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
          keepRow = true;
        }
      });
      return keepRow;
    });
    currState[tableConfig.key].currPage = 1;
    this.setState({currState: currState});
  }

  getDropDown(tableConfig, rowData) {
    return (
        <UncontrolledDropdown>
          <DropdownToggle
              className="btn-icon-only text-light"
              href="#"
              role="button"
              color=""
              onClick={e => e.preventDefault()}>
            <i className="fas fa-ellipsis-h"/>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            {
              tableConfig.actions.map(action => {
                return (
                    <DropdownItem href="#" key={action.key + '_' + (rowData.r_id || rowData.v_id)}
                                  onClick={e => {
                                    this.takeAction(action, rowData);
                                    e.preventDefault();
                                  }}>
                      {action.name}
                    </DropdownItem>
                );
              })
            }
          </DropdownMenu>
        </UncontrolledDropdown>
    );
  }

  getRows(tableConfig) {
    const {currState} = this.state;
    const currTableState = currState[tableConfig.key];
    if (currTableState.filteredData.length === 0) {
      return null;
    }
    let startNumber = (currTableState.currPage - 1) * tableConfig.pageSize;
    let endNumber = Math.min(startNumber + tableConfig.pageSize,
        currTableState.filteredData.length);
    const dataToReturn = [];
    for (let i = startNumber; i < endNumber; i++) {
      let currRowData = currTableState.filteredData[i];
      dataToReturn.push(<tr key={tableConfig.key + '_' + i}>
        <td key={tableConfig.key + '_' + i + ')s_no'}>{i + 1}</td>
        {
          tableConfig.fieldKeys.map(k => {
            return (<td key={tableConfig.key + '_' + i + '_' + k}>{currRowData[k]}</td>)
          })
        }
        <td key={tableConfig.key + '_' + i + '_action'}>
          {this.getDropDown(tableConfig, currRowData)}
        </td>
      </tr>);
    }
    return dataToReturn;
  }

  getNavigationPageNums(tableConfig) {
    const {currState} = this.state;
    const currTableState = currState[tableConfig.key];
    let startPage = Math.max(currTableState.currPage - 2, 1);
    let endPage = Math.min(startPage + 4, Math.ceil(
        currTableState.filteredData.length / tableConfig.pageSize));
    const dataToReturn = [];
    for (let i = startPage; i <= endPage; i++) {
      dataToReturn.push(
          <PaginationItem key={tableConfig.key + '_nav_' + i} className={currTableState.currPage === i ? 'active' : ''}>
            <PaginationLink href="#" onClick={e => {
              currState[tableConfig.key].currPage = i;
              this.setState({currState: currState});
              e.preventDefault();
            }}>
              {i}
            </PaginationLink>
          </PaginationItem>);
    }
    return dataToReturn;
  }

  getNavigation(tableConfig) {
    const {currState} = this.state;
    const currTableState = currState[tableConfig.key];
    return (
        <nav>
          <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0">
            <PaginationItem className="disabled">
              <PaginationLink
                  href="#"
                  onClick={e => {
                    if (currTableState.currPage > 1) {
                      currState[tableConfig.key].currPage = currTableState.currPage - 1;
                      this.setState({currState: currState});
                    }
                    e.preventDefault();
                  }}>
                <i className="fas fa-angle-left"/>
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            {this.getNavigationPageNums(tableConfig)}

            <PaginationItem>
              <PaginationLink href="#" onClick={e => {
                if (currTableState.currPage < Math.ceil(
                    currTableState.filteredData.length / tableConfig.pageSize)) {
                  currState[tableConfig.key].currPage = currTableState.currPage + 1;
                  this.setState({currState: currState});
                }
                e.preventDefault();
              }}>
                <i className="fas fa-angle-right"/>
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
    );
  }

  getTable(tableConfig) {
    return (
        <Col>
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-3 d-inline-block col-sm-4">
                {tableConfig.title} ({this.state.currState[tableConfig.key].filteredData.length})
              </h3>
              <Form inline className="navbar-search d-inline-block ml-auto col-sm-8"
                    onSubmit={e => e.preventDefault()}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mr-0 ml-auto">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search" type="text"
                           value={this.state.currState[tableConfig.key].searchString}
                           onChange={e => this.search(e, tableConfig)}/>
                  </InputGroup>
                </FormGroup>
              </Form>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">S.No.</th>
                {
                  tableConfig.fieldHeaders.map(fh => {
                    return (
                        <th scope="col" key={tableConfig.key + '_' + fh}>{fh}</th>
                    );
                  })
                }
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>{this.getRows(tableConfig)}</tbody>
            </Table>
            <CardFooter className="py-4">
              {this.getNavigation(tableConfig)}
            </CardFooter>
          </Card>
        </Col>
    );
  }

  render() {
    if (!localStorage.getItem(config.userIdStorageKey)) {
      this.props.history.push("/");
      return null;
    }
    return (
        <>
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              {this.getTable(tableConfigMap.requests)}
            </Row>
            <Row className="mt-5">
              {this.getTable(tableConfigMap.volunteers)}
            </Row>
          </Container>
        </>
    );
  }

  takeAction(action, rowData) {
    console.log(action, rowData);
  }
}

export default withRouter(Tables);