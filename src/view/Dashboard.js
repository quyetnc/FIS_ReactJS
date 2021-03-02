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
import api, {apiCall} from "../utils/api";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalUser: 0,
      todayCheckin: 0,
      todayCheckout: 0,
      totalClaim: 0,
      userByDepartment: [],
      userByDepartmentChart: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: [],
          }
        ]
      },
      checkinByDayChart: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: []
          },
          {
            label: '',
            data: [],
            backgroundColor: []
          }
        ]
      },
      checkoutByDayChart: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: []
          }
        ]
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userByDepartmentChart !== this.props.userByDepartmentChart) {

    }
  }

  async componentDidMount() {
    // await this.getTotalUser()
    // await this.getTodayCheckin()
    // await this.getTodayCheckout()
    // await this.getUserByDepartment()
    await this.getDashboardData();
    await this.getTotalClaim();
  }

  getTotalUser = async () => {
    await fetch(`${config.IPLOCAL}/api/dashboard/get_total_user`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ totalUser: data.data.totalUser })
      })
      .catch(err => console.log(err))
  }

  getTodayCheckin = async () => {
    await fetch(`${config.IPLOCAL}/api/dashboard/get_today_checkin`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ todayCheckin: data.data.totalCheckin })
      })
      .catch(err => console.log(err))
  }

  getTodayCheckout = async () => {
    await fetch(`${config.IPLOCAL}/api/dashboard/get_today_checkout`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ todayCheckout: data.data.totalCheckout })
      })
      .catch(err => console.log(err))
  }

  getUserByDepartment = async () => {
    await fetch(`${config.IPLOCAL}/api/dashboard/get_total_user_by_department`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ userByDepartment: data.data.user })
      })
      .catch(err => console.log(err))
  }

  async getTotalClaim() {
    try {
      let getClaim = await apiCall("get", api.etms.getClaimReport());
      this.setState({totalClaim: getClaim.length})
    } catch (err) {
      console.error(err);
    }
  }

  convertTime = (time) => {
    if (time === null) {
      return ''
    }
    let day = time.getUTCDate()
    if (day < 10) {
      day = '0' + day
    }

    let month = time.getUTCMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let year = time.getUTCFullYear()

    let result = `${day}-${month}-${year}`
    return result
  }

  getDashboardData = async () => {
    await fetch(`${config.IPLOCAL}/api/dashboard/get_dashboard_data`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          totalUser: data.data.totalUser,
          todayCheckin: data.data.totalCheckin,
          todayCheckout: data.data.totalCheckout,
          userByDepartment: data.data.userByDepartment
        })
        let label = []
        let chartData = []
        for (const department of data.data.userByDepartment) {
          label.push(department._id)
          chartData.push(department.count)
        }

        let checkinLabel = []
        let checkinData = []
        for (const checkin of data.data.checkinByDay) {
          checkinLabel.push(checkin.date)
          checkinData.push(checkin.count)
        }

        let checkoutLabel = []
        let checkoutData = []
        for (const checkout of data.data.checkoutByDay) {
          checkoutLabel.push(checkout.date)
          checkoutData.push(checkout.count)
        }

        this.setState({
          userByDepartmentChart: {
            labels: label,
            datasets: [
              {
                label: '',
                displayLegend: false,
                data: chartData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                ],
              }
            ],

          },
          checkinByDayChart: {
            labels: checkinLabel,
            datasets: [
              {
                label: 'Total Checkin',
                data: checkinData,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 0.6)',
                borderJoinStyle: 'miter',
                borderCapStyle: 'butt',
                type: 'line',
                lineTension: 0.1,
              },
              {
                label: 'Total Checkout',
                data: checkoutData,
                borderColor: 'rgba(255, 159, 64, 0.6)',
                type: 'line',
                fill: false,
                borderJoinStyle: 'miter',
                borderCapStyle: 'butt',
                lineTension: 0.1,
              }
            ]
          },
          // checkoutByDayChart: {
          //   labels: checkoutLabel,
          //   datasets: [
          //     {
          //       label: 'Total Checkout',
          //       data: checkoutData,
          //       backgroundColor: [
          //         'rgba(255, 159, 64, 0.6)',
          //         'rgba(255, 99, 132, 0.6)',
          //         'rgba(54, 162, 235, 0.6)',
          //         'rgba(75, 192, 192, 0.6)',
          //         'rgba(153, 102, 255, 0.6)',
          //       ]
          //     }
          //   ]
          // }
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { totalUser, todayCheckin, todayCheckout, userByDepartment, totalClaim } = this.state
    const itemList = [
      {
        item: '1',
        title: 'Tổng số người dùng',
        content: totalUser,
        href: '/tdcmobileapp/fis/listUser'
      },
      {
        item: '2',
        title: 'Tổng số lượng checkin hôm nay',
        content: todayCheckin,
        href: '/tdcmobileapp/fis/listUserCheckinout'
      },
      {
        item: '3',
        title: 'Tổng số lượng checkout hôm nay',
        content: todayCheckout,
        href: '/tdcmobileapp/fis/listUserCheckinout'
      },
      {
        item: '4',
        title: 'Tổng số lượng checkin hôm nay',
        content: todayCheckin,
        href: '/tdcmobileapp/fis/listUserByCondition'
      },
      {
        item: '5',
        title: 'Tổng số đơn xin phép hôm nay',
        content: totalClaim,
        href: '/tdcmobileapp/fis/listClaim'
      },
    ]
    const tableList = this.state.userByDepartment.map((data, index) =>
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{data._id}</td>
        <td>{data.count}</td>
      </tr>
    )
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
          {
            itemList.map(item =>
              <Col xs={12} sm={12} md={4} lg={4} xl={4} style={{ marginBottom: '20px' }}>
                <DashboardItem
                  href={item.href}
                  item={item.item}
                  title={item.title}
                  content={item.content} />
              </Col>
            )
          }
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '40px' }}>
            <PieChart
              title='Tổng số người dùng theo phòng ban'
              displayLegend={false}
              chartData={this.state.userByDepartmentChart}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '40px' }}>
            <Table striped bordered hover style={{ textAlign: 'center' }} size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Department</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {tableList}
                <tr>
                  <th></th>
                  <td></td>
                  <td>{totalUser}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row> */}
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '40px' }}>
            <LineChart title='Tổng số checkin, checkout theo ngày' chartData={this.state.checkinByDayChart} legendPosition="bottom" />
          </Col>
          {/* <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginTop: '40px' }}>
            <LineChart title='Tổng số checkout theo ngày' chartData={this.state.checkoutByDayChart} legendPosition="bottom" />
          </Col> */}
        </Row>

      </Container>
    )
  }
}

export default Dashboard

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}