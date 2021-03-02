import React, { Component } from 'react'
import Header from '../component/Header'
import DashboardItem from '../component/DashboardItem'
import {
  Container, Row, Col, Table,
  Button, Image
} from 'react-bootstrap'
import config from '../config'
import PieChart from '../component/chartTypes/PieChart'
import LineChart from '../component/chartTypes/LineChart'
import CustomTable from '../component/CustomTable'

class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      pageSize: 20,
      page: 1
    }
  }


  async componentDidMount() {
    await this.getUserList(20, 1)
  }

  getUserList = async (pageSize, page) => {
    await fetch(`${config.IPLOCAL}/api/dashboard/get_user_list?pageSize=${pageSize}&page=${page}`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ listUser: data.data })
      })
      .catch(err => console.log(err))
  }

  handleClickPagination = (pageSize, page) => {
    this.setState({
      pageSize: pageSize,
      page: page
    }, () => {
      this.getUserList(pageSize, page)
    })
  }

  render() {
    const { listUser } = this.state
    const columns = [
      '#',
      'Fullname',
      'Username',
      'Department',
      'First login',
      'App version',
      'Lasted login',
    ]
    return (
      <Container>
        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col>
            <a href='/tdcmobileapp/fis/dashboard' style={{ textDecoration: 'none' }}>
              <h1 style={{ color: '#f07933' }}>Dashboard FIS Insight App</h1>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '40px' }}>
            <CustomTable
              columns={columns}
              rowsData={listUser}
              handleClick={(pageSize, page) => this.handleClickPagination(pageSize, page)}
              item={
                listUser.map((data, index) =>
                  <tr key={index} >
                    <th>{(index + 1) + this.state.pageSize * (this.state.page - 1)}</th>
                    <td>{data.fullName}</td>
                    <td>{data.username}</td>
                    <td>{data.department}</td>
                    <td>{data.created_at}</td>
                    <td>
                      {`${(data.platform !== null) ? data.platform.toUpperCase() : ''}
                    ${(data.version !== null) ? `(${data.version}.${data.buildNumber})` : ''}`}
                    </td>
                    <td> {data.lasted_login}</td>
                  </tr>
                )
              }
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ListUser
