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
import CustomTable from '../component/CustomTable'
import DescriptionIcon from '@material-ui/icons/Description'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
class WHFReport extends Component {
  constructor(props) {
    super(props);
    let _date = new Date()
    this.state = {
      listUser: [],
      pageSize: 20,
      page: 1,
      fileUrl: '',
      departmentList: [],
      showDepartment: false,
      departmentSearchList: [],
      date: new Date(_date.getTime() - (_date.getTimezoneOffset() * 60000)),
      loading: false
    }
  }


  async componentDidMount() {
    await this.getUserList()
    await this.getDepartmentList()
  }

  getUserList = async (department) => {
    this.setState({
      loading: true
    })
    console.log(this.state.date.toISOString())
    if (department === undefined) {
      department = ''
    }
    await fetch(`${config.IPADMIN}/api/report/get_special_attendance_report?department=${department}&date=${this.state.date}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({
          listUser: data.data,
          fileUrl: data.fileUrl,
          loading: false
        })
      })
      .catch(err => console.log(err))
  }

  getDepartmentList = async () => {
    this.setState({
      loading: true
    })
    await fetch(`${config.IPLOCAL}/api/dashboard/get_total_user_by_department`, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        let tmp = []
        for (const item of data.data.user) {
          tmp.push(item._id)
        }
        this.setState({
          departmentSearchList: tmp,
          loading: false
        })
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

  handleSearch = () => {
    let department = ''
    if (this.state.departmentList.length > 0) {
      for (const item of this.state.departmentList) {
        department = department + item + ','
      }
    }
    this.getUserList(department)
  }

  render() {
    const { listUser } = this.state
    const columns = [
      '#',
      'Account email',
      'Họ và tên',
      'Bộ phận',
      'Địa điểm làm việc',
      'Chi tiết địa điểm làm việc',
      'Lí do',
    ]
    return (
      <Container fluid >
        <div style={{
          marginRight: '20px',
          marginLeft: '20px',
        }}>
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
                href={this.state.fileUrl}
                color="secondary"
                variant="contained"
                startIcon={<DescriptionIcon />}
              >
                Tải xuống báo cáo
            </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Ngày"
                  value={this.state.date}
                  onChange={(date) => {
                    console.log(date)
                    this.setState({
                      date: date
                    })
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: '20px',
              marginBottom: '10px',
            }}>
            <Col>
              {(this.state.departmentList !== undefined) &&
                <div>
                  <p style={styles.label}>
                    Phòng ban
                  <span
                      style={{
                        fontSize: '16px',
                        fontWeight: '200',
                        marginLeft: '20px'
                      }}
                      onClick={() => {
                        this.setState({
                          showDepartment: !this.state.showDepartment
                        })
                      }}>
                    </span>
                  </p>
                  {/* <Row>
                    <Col>
                      <TextField
                        style={{
                          width: '50%'
                        }}
                        label='Tìm kiếm'
                        id="standard-basic"
                        defaultValue={''}
                        onChange={(event) => {
                          let list = []
                          for (let item of this.state.departmentList) {
                            if (item.search(event.target.value) !== -1) {
                              list.push(item)
                            }
                          }
                          this.setState({
                            departmentSearchList: list,
                            showDepartment: true
                          })
                        }}
                      />
                    </Col>
                  </Row> */}
                  {
                    this.state.departmentSearchList.map(item =>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              this.state.departmentList.findIndex(
                                function (element) {
                                  return element == item
                                }
                              ) !== -1
                            }
                            onChange={(event) => {
                              let index = this.state.departmentList.findIndex(
                                function (element) {
                                  return element == item
                                }
                              )

                              if (index === -1) {
                                this.setState({
                                  departmentList: [
                                    ...this.state.departmentList,
                                    event.target.value
                                  ]
                                })
                              } else {
                                this.state.departmentList.splice(index, 1)
                                this.setState({
                                  departmentList: [
                                    ...this.state.departmentList
                                  ]
                                })

                              }
                            }}
                            value={item} />
                        }
                        label={item}
                      />
                    )
                  }
                </div>
              }
            </Col>
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col
              xs={{ offset: 10 }}
              sm={{ offset: 10 }} md={{ offset: 10 }} lg={12} xl={12}>
              <Button
                stule={{
                  float: 'right'
                }}
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={this.handleSearch}
              >
                Tìm kiếm
                </Button>
            </Col>
          </Row>
          <Row>

            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '40px' }}>
              <CustomTable
                isPagination={false}
                columns={columns}
                rowsData={listUser}
                handleClick={(pageSize, page) => this.handleClickPagination(pageSize, page)}
                item={
                  listUser.map((data, index) =>
                    <tr key={index} >
                      <th>{(index + 1) + this.state.pageSize * (this.state.page - 1)}</th>
                      <td>{data.email}</td>
                      <td>{data.fullName}</td>
                      <td>{data.department}</td>
                      <td>{data.location}</td>
                      <td>{data.locationDetail}</td>
                      <td>{data.reason}</td>

                    </tr>
                  )
                }
              />
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

export default WHFReport

const styles = {
  label: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  subLabel: {
    fontSize: '15px',
    fontWeight: 'bold'
  }
}

