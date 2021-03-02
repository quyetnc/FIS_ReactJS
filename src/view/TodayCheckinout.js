import React, { Component } from 'react'
import Header from '../component/Header'
import DashboardItem from '../component/DashboardItem'
import {
  Container, Row, Col, Table,
  Image
} from 'react-bootstrap'
import config from '../config'
import PieChart from '../component/chartTypes/PieChart'
import LineChart from '../component/chartTypes/LineChart'
import Button from '@material-ui/core/Button'
import DescriptionIcon from '@material-ui/icons/Description'
import CustomTable from '../component/CustomTable'

class TodayCheckinout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      loading: false,
      pageSize: 20,
      page: 1
    }
  }


  async componentDidMount() {
    await this.getUserList(this.state.pageSize, this.state.page)
  }

  getUserList = async (pageSize, page) => {
    this.setState({
      loading: true
    })  //${this.props.location.query.date}
    await fetch(`${config.IPLOCAL}/api/dashboard/get_today_checkin_list?pageSize=${pageSize}&page=${page}`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          listUser: data.data,
          loading: false
        })
      })
      .catch(err => console.log(err))
    this.setState({
      loading: false
    })
  }

  downloadFile = async () => {
    this.setState({
      loading: true
    })
    await fetch(`${config.IPLOCAL}/api/dashboard/get_today_checkinout_excel${window.location.search}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTimeout(() => {
          let win = window.open(data.data.fileUrl, '_blank');
          win.focus()
        }, 2000)
        this.setState({
          loading: false
        })
        // win.close()
      })
      .catch(err => {
        console.log(err)
      })
    this.setState({
      loading: false
    })
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
    const tableList = listUser.map((data, index) =>
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{data.fullName}</td>
        <td>{data.username}</td>
        <td>{data.department}</td>
        <td>{data.checkinTime}</td>
        <td>{data.checkoutTime}</td>
        <td>{data.checkin_wfh}</td>
        <td>{data.checkout_wfh}</td>
        <td>{(data.isWFH) ? 'X' : ''}</td>
      </tr>
    )
    const columns = [
      '#',
      'Fullname',
      'Username',
      'Department',
      'Checkin',
      'Checkout',
      'Checkin WFH',
      'Checkout WFH',
      'WFH',
    ]
    return (
      <Container>
        {
          (this.state.loading === true) &&
          <div
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              margin: 'auto',
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0, 0.5)',
              textAlign: 'center',
            }}
          >
            <Image
              src={require('../assets/image/loading.gif')}
              style={{
                width: '2%',
                marginTop: '40vh'
              }}
            />
          </div>
        }
        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col>
            <a href='/tdcmobileapp/fis/dashboard' style={{ textDecoration: 'none' }}>
              <h1 style={{ color: '#f07933' }}>Dashboard FIS Insight App</h1>
            </a>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<DescriptionIcon />}
              onClick={this.downloadFile}
            >
              Tải xuống báo cáo
            </Button>
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
                    <td>{data.checkinTime}</td>
                    <td>{data.checkoutTime}</td>
                    <td>{data.checkin_wfh}</td>
                    <td>{data.checkout_wfh}</td>
                    <td>{(data.isWFH) ? 'X' : ''}</td>
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

export default TodayCheckinout
