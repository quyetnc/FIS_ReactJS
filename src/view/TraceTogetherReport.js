import React, { Component } from 'react'
import Header from '../component/Header'
import DashboardItem from '../component/DashboardItem'
import {
  Container, Row, Col, Table, Image
} from 'react-bootstrap'
import config from '../config'
import PieChart from '../component/chartTypes/PieChart'
import LineChart from '../component/chartTypes/LineChart'
import CustomTable from '../component/CustomTable'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();
class TraceTogetherReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      phone: '',
      pageSize: 20,
      page: 1,

    }
  }


  async componentDidMount() {
    // await this.getData(20, 1)
  }

  getData = async (phone, pageSize, page) => {
    await fetch(`${config.IPTRACETOGETHER}/together/bluetooth/get_list_bluetooth_connected_by_phone?phone=${phone}&pageSize=${pageSize}&page=${page}`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)

        this.setState({ response: data })
      })
      .catch(err => console.log(err))
  }

  handleClickPagination = (pageSize, page) => {
    console.log(page, pageSize)
    this.setState({
      pageSize: pageSize,
      page: page
    }, () => {
      this.handleSearch(pageSize, page)
    })
  }

  handleSearch = async () => {
    let { phone, pageSize, page } = this.state
    for (var i = 1; i < 100; i++) {
      window.clearInterval(i)

    }
    await this.getData(phone, pageSize, page)
    if (this.state.response.resultCode === -1) {
      for (var i = 1; i < 100; i++) {
        window.clearInterval(i)

      }
      return alert(this.state.response.message)
    } else if (this.state.response.resultCode === 1 && (this.state.response.data === null || this.state.response.data === undefined || this.state.response.data.length === 0)) {
      for (var i = 1; i < 100; i++) {
        window.clearInterval(i)

      }
      setInterval(async () => {
        notyf.success('Updated !!!');
        await this.getData(phone, pageSize, page)
      }, 10000)
      return alert("Success ! Data null")
    } else {
      for (var i = 1; i < 100; i++) {
        window.clearInterval(i)

      }
      setInterval(async () => {
        notyf.success('Updated !!!');
        await this.getData(phone, pageSize, page)
      }, 10000)
      return
    }
  }

  converMilisecond = (time) => {
    time = new Date(parseInt(time))
    let day = time.getDate()
    if (day < 10) {
      day = '0' + day
    }

    let month = time.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let year = time.getFullYear()

    let hours = time.getHours()
    if (hours < 10) {
      hours = '0' + hours
    }
    let minutes = time.getMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    let seconds = time.getSeconds()
    if (seconds < 10) {
      seconds = '0' + seconds
    }

    let result = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
    return result
  }

  render() {
    const { response, phone } = this.state
    const columns = [
      '#',
      'Phone',
      'RSSI',
      'Tx Power',
      'Distance',
      'Time',
    ]
    console.log(33, this.state.response.data)
    return (
      <Container>
        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col>
            <a href='/tdcmobileapp/trace_together_report' style={{ textDecoration: 'none' }}>
              <h1 style={{ color: '#2E3192' }}>Corona App Report</h1>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={3} xl={3} style={{ marginTop: '40px' }}>
            <Input
              id="standard-adornment-password"
              type={'text'}
              value={phone}
              onChange={(event) => {
                this.setState({
                  phone: event.target.value
                })
              }}
              placeholder='Vui lòng nhập SĐT'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleSearch}
                  // onMouseDown={handleMouseDownPassword}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Col>

        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '40px' }}>
            <CustomTable
              columns={columns}
              rowsData={this.state.response.data !== null && this.state.response.data !== undefined && this.state.response.length > 0}
              handleClick={(pageSize, page) => this.handleClickPagination(pageSize, page)}
              item={
                this.state.response.data !== null && this.state.response.data !== undefined && this.state.response.data.length > 0 ?
                  this.state.response.data.map((data, index) =>
                    <tr key={index} >
                      <th>{(index + 1) + this.state.pageSize * (this.state.page - 1)}</th>
                      <td>{data.data.phone}</td>
                      <td>{data.data.rssi}</td>
                      <td>{data.data.txpower}</td>
                      <td>{data.data.distance}</td>
                      <td>{this.converMilisecond(data.data.time)}</td>
                    </tr>
                  ) : []
              }
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default TraceTogetherReport
