import React, { Component } from 'react';
import {
  Container, Row, Col, Table, Image
} from 'react-bootstrap'
import 'date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import DescriptionIcon from '@material-ui/icons/Description'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import config from '../config'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CustomTable from '../component/CustomTable'

class MedicalListReport extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    const { cookies } = props
    super(props)
    let date = new Date()
    let startedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000) - 86400000).setUTCHours(-7, 0, 0, 0)
    let endedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).setUTCHours(-7, 0, 0, 0)
    this.state = {
      optionsList: {},
      startedDate: startedDate,
      endedDate: endedDate,
      showFilter: false,
      showDepartment: false,
      departmentSearchList: [],
      workingLocationList: [],
      departmentList: [],
      ques6List: [],
      ques7List: [],
      ques8List: [],
      listUser: [],
      token: cookies.get('token'),
      pageSize: 20,
      page: 1,
      loading: false
    }
  }

  getOptionList = async () => {
    await fetch(`${config.IPRMIS}/api/medical/get_options_list`, {
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
        this.setState({
          optionsList: data.data,
          departmentSearchList: data.data.departmentList,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  async componentDidMount() {
    // if (this.state.token !== null && this.state.token !== undefined) {
    await this.getOptionList()
    await this.handleSearch()
    // }

  }

  handleSearch = async () => {
    this.setState({
      loading: true
    })
    let {
      startedDate,
      endedDate,
      workingLocationList,
      departmentList,
      ques6List,
      ques7List,
      ques8List,
      pageSize,
      page
    } = this.state
    startedDate = new Date(new Date(startedDate).getTime() - (new Date(startedDate).getTimezoneOffset() * 60000))
    endedDate = new Date(new Date(endedDate).getTime() - (new Date(endedDate).getTimezoneOffset() * 60000))
    console.log(new Date(startedDate).toISOString(), new Date(endedDate).toISOString())

    let bodyData = {
      department: departmentList.length <= 0 ? '' : departmentList,
      workingLocation: workingLocationList.length <= 0 ? '' : workingLocationList,
      ques6: ques6List.length <= 0 ? '' : ques6List,
      ques7: ques7List.length <= 0 ? '' : ques7List,
      ques8: ques8List.length <= 0 ? '' : ques8List,
    }
    // let convertTime = (time) => {
    //   let day = time.getUTCDate()
    //   if (day < 10) {
    //     day = '0' + day
    //   }

    //   let month = time.getUTCMonth() + 1
    //   if (month < 10) {
    //     month = '0' + month
    //   }
    //   let year = time.getUTCFullYear()
    //   let result = `${year}-${month}-${day}`
    //   return result
    // }
    await fetch(`${config.IPRMIS}/api/medical/get_medical_report?fromDate=${new Date(startedDate).toISOString()}&toDate=${new Date(endedDate).toISOString()}&pageSize=${pageSize}&page=${page}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.cookies.get('token')
      },
      mode: 'cors',
      body: JSON.stringify(bodyData)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          listUser: data.data
        })
        this.setState({
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
    this.setState({
      loading: false
    })
  }

  downloadFile = async () => {
    this.setState({
      loading: true
    })
    let {
      startedDate,
      endedDate,
      workingLocationList,
      departmentList,
      ques6List,
      ques7List,
      ques8List
    } = this.state
    let bodyData = {
      department: departmentList.length <= 0 ? '' : departmentList,
      workingLocation: workingLocationList.length <= 0 ? '' : workingLocationList,
      ques6: ques6List.length <= 0 ? '' : ques6List,
      ques7: ques7List.length <= 0 ? '' : ques7List,
      ques8: ques8List.length <= 0 ? '' : ques8List,
    }
    startedDate = new Date(new Date(startedDate).getTime() - (new Date(startedDate).getTimezoneOffset() * 60000))
    endedDate = new Date(new Date(endedDate).getTime() - (new Date(endedDate).getTimezoneOffset() * 60000))
    // let convertTime = (time) => {
    //   let day = time.getUTCDate()
    //   if (day < 10) {
    //     day = '0' + day
    //   }

    //   let month = time.getUTCMonth() + 1
    //   if (month < 10) {
    //     month = '0' + month
    //   }
    //   let year = time.getUTCFullYear()
    //   let result = `${year}-${month}-${day}`
    //   return result
    // }
    await fetch(`${config.IPRMIS}/api/medical/create_excel_report?fromDate=${new Date(startedDate).toISOString()}&toDate=${new Date(endedDate).toISOString()}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.cookies.get('token')
      },
      mode: 'cors',
      body: JSON.stringify(bodyData)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTimeout(() => {
          let win = window.open(data.data.fileUrl, '_blank');
          win.focus()
        }, 5000)
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

  downloadCheckListUserMedicalReport = async () => {
    this.setState({
      loading: true
    })
    let {
      startedDate,
      endedDate,
    } = this.state
    startedDate = new Date(new Date(startedDate).getTime() - (new Date(startedDate).getTimezoneOffset() * 60000))
    endedDate = new Date(new Date(endedDate).getTime() - (new Date(endedDate).getTimezoneOffset() * 60000))
    await fetch(`${config.IPADMIN}/api/medical/check_list_user_medical_report_excel?fromDate=${new Date(startedDate).toISOString()}&toDate=${new Date(endedDate).toISOString()}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.cookies.get('token')
      },
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTimeout(() => {
          let win = window.open(data.fileUrl, '_blank');
          win.focus()
        }, 5000)
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

  downloadSpecialListMedicalReport = async () => {
    this.setState({
      loading: true
    })
    let {
      startedDate,
      endedDate,
    } = this.state
    startedDate = new Date(new Date(startedDate).getTime() - (new Date(startedDate).getTimezoneOffset() * 60000))
    endedDate = new Date(new Date(endedDate).getTime() - (new Date(endedDate).getTimezoneOffset() * 60000))
    await fetch(`${config.IPADMIN}/api/medical/special_list_medical_report_excel?fromDate=${new Date(startedDate).toISOString()}&toDate=${new Date(endedDate).toISOString()}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.cookies.get('token')
      },
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setTimeout(() => {
          let win = window.open(data.data.fileUrl, '_blank');
          win.focus()
        }, 5000)
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
      this.handleSearch(pageSize, page)
    })
  }

  render() {
    let {
      optionsList,
      showFilter,
      showDepartment,
      departmentSearchList,
      workingLocationList,
      departmentList,
      ques6List,
      ques7List,
      ques8List,
      listUser
    } = this.state
    const tableList = listUser.map((data, index) =>
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{data[1].answer}</td>
        <td>{data[2].answer}</td>
        <td>{data[3].answer}</td>
        <td>{data[4].answer}</td>
        <td>{data[5].answer}</td>
        <td>{data[9].answer}</td>
      </tr>
    )
    if (this.props.cookies.get('token') === undefined) {
      return <Redirect to='/tdcmobileapp/fis/login' />
    }
    const columns = [
      '#',
      'Họ và tên',
      'Email',
      'Phòng ban',
      'Chi nhánh',
      'Số điện thoại cá nhân',
      'Thời gian khai báo',
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
          <Col xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}>
            <h1 style={{ color: '#f07933' }}>Khai báo y tế</h1>
          </Col>
          <Col
            xs={{ offset: 7 }}
            sm={{ offset: 7 }}
            md={{ offset: 7 }}
            lg={{ offset: 7 }}
            xl={{ offset: 7 }}
          >
            <Button
              color="primary"
              endIcon={<PowerSettingsNewIcon />}
              onClick={() => {
                const { cookies } = this.props;
                cookies.remove('token', { path: '/' })
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col>
            <Button
              color="primary"
              startIcon={<SearchIcon />}
              onClick={() => {
                this.setState({
                  showFilter: !this.state.showFilter
                })
              }}
            >
              {showFilter ? 'Ẩn tìm kiếm' : 'Hiện tìm kiếm'}
            </Button>
          </Col>
          <Col
            xs={{ offset: 7 }}
            sm={{ offset: 7 }}
            md={{ offset: 7 }}
            lg={{ offset: 7 }}
            xl={{ offset: 7 }} >
            <Button
              color="secondary"
              variant="contained"
              startIcon={<DescriptionIcon />}
              onClick={this.downloadFile}
              style={{
                marginTop: '0.5em'
              }}
            >
              Tải xuống báo cáo
            </Button>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<DescriptionIcon />}
              onClick={this.downloadCheckListUserMedicalReport}
              style={{
                marginTop: '0.5em'
              }}
            >
              DS khai báo y tế
            </Button>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<DescriptionIcon />}
              onClick={this.downloadSpecialListMedicalReport}
              style={{
                marginTop: '0.5em'
              }}
            >
              Trường hợp lưu ý
            </Button>
          </Col>

        </Row>
        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col>

          </Col>
        </Row>
        {
          showFilter &&
          <div>
            <Row
              style={{
                marginTop: '20px',
                marginBottom: '10px',
              }}>
              <Col>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    ampm={false}
                    // disableToolbar
                    variant="inline"
                    // format="yyyy/MM/dd HH:mm"
                    // margin="normal"
                    label="Ngày bắt đầu"
                    value={this.state.startedDate}
                    onChange={(date) => {
                      console.log(date)
                      this.setState({
                        startedDate: date
                      })

                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDateTimePicker
                    ampm={false}
                    style={{ marginLeft: '20px' }}
                    // disableToolbar
                    variant="inline"
                    // format="yyyy/MM/dd HH:mm"
                    // margin="normal"
                    label="Ngày kết thúc"
                    value={this.state.endedDate}
                    onChange={(date) => {
                      this.setState({
                        endedDate: date
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
                {(optionsList !== undefined && optionsList.workingLocationList !== undefined) &&
                  <div>
                    <p style={styles.label}>Nơi làm việc</p>
                    {
                      optionsList.workingLocationList.map(item =>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                workingLocationList.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                ) !== -1
                              }
                              onChange={(event) => {
                                let index = workingLocationList.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                )

                                if (index === -1) {
                                  this.setState({
                                    workingLocationList: [
                                      ...workingLocationList,
                                      event.target.value
                                    ]
                                  })
                                } else {
                                  workingLocationList.splice(index, 1)
                                  this.setState({
                                    workingLocationList: [
                                      ...workingLocationList
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
            <Row
              style={{
                marginTop: '20px',
                marginBottom: '10px',
              }}>
              <Col>
                {(optionsList !== undefined
                  && optionsList.departmentList !== undefined) &&
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
                        {(showDepartment) ? 'ẩn tất cả' : 'hiển thị tất cả'}
                      </span>
                    </p>
                    <Row>
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
                            for (let item of optionsList.departmentList) {
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
                    </Row>
                    {
                      (showDepartment) &&
                      this.state.departmentSearchList.map(item =>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                departmentList.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                ) !== -1
                              }
                              onChange={(event) => {
                                let index = departmentList.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                )

                                if (index === -1) {
                                  this.setState({
                                    departmentList: [
                                      ...departmentList,
                                      event.target.value
                                    ]
                                  })
                                } else {
                                  departmentList.splice(index, 1)
                                  this.setState({
                                    departmentList: [
                                      ...departmentList
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
            <Row
              style={{
                marginTop: '20px',
                marginBottom: '10px',
              }}>
              <Col>
                {(optionsList !== undefined
                  && optionsList.ques6List !== undefined) &&
                  <div>
                    <p style={styles.label}>6. Anh/Chị có dấu hiệu lâm sàng nào dưới đây ?</p>
                    {
                      optionsList.ques6List.map(item =>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                ques6List.findIndex(
                                  function (element) {
                                    // console.log(element)
                                    return optionsList.ques6List[element] == item
                                  }
                                ) !== -1
                              }
                              onChange={(event) => {
                                let index = ques6List.findIndex(
                                  function (element) {
                                    return optionsList.ques6List[element] == item
                                  }
                                )

                                if (index === -1) {
                                  let value = optionsList.ques6List.findIndex(
                                    function (element) {
                                      return element == event.target.value
                                    }
                                  )
                                  this.setState({
                                    ques6List: [
                                      ...ques6List,
                                      value.toString()
                                    ]
                                  }, () => console.log(this.state.ques6List))
                                } else {
                                  ques6List.splice(index, 1)
                                  this.setState({
                                    ques6List: [
                                      ...ques6List
                                    ]
                                  }, () => console.log(this.state.ques6List))
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
            <Row
              style={{
                marginTop: '20px',
                marginBottom: '10px',
              }}>
              <Col>
                {(optionsList !== undefined
                  && optionsList.ques7List !== undefined) &&
                  <div>
                    <p style={styles.label}>7. Anh/Chị hoặc người thân tiếp xúc gần có vừa di chuyển từ nơi khác về không ?</p>
                    {
                      optionsList.ques7List.map(item =>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                ques7List.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                ) !== -1
                              }
                              onChange={(event) => {
                                let index = ques7List.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                )

                                if (index === -1) {
                                  this.setState({
                                    ques7List: [
                                      ...ques7List,
                                      event.target.value
                                    ]
                                  })
                                } else {
                                  ques7List.splice(index, 1)
                                  this.setState({
                                    ques7List: [
                                      ...ques7List
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
            <Row
              style={{
                marginTop: '20px',
                marginBottom: '10px',
              }}>
              <Col>
                {(optionsList !== undefined
                  && optionsList.ques8List !== undefined) &&
                  <div>
                    <p style={styles.label}>8. Anh/Chị hoặc người thân tiếp xúc gần có tiếp xúc gần với người từ nước ngoài/ người từ vùng dịch về không ?</p>
                    {
                      optionsList.ques8List.map(item =>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                ques8List.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                ) !== -1
                              }
                              onChange={(event) => {
                                let index = ques8List.findIndex(
                                  function (element) {
                                    return element == item
                                  }
                                )

                                if (index === -1) {
                                  this.setState({
                                    ques8List: [
                                      ...ques8List,
                                      event.target.value
                                    ]
                                  })
                                } else {
                                  ques8List.splice(index, 1)
                                  this.setState({
                                    ques8List: [
                                      ...ques8List
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
          </div>
        }
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
                    <td>{data[1].answer}</td>
                    <td>{data[2].answer}</td>
                    <td>{data[3].answer}</td>
                    <td>{data[4].answer}</td>
                    <td>{data[5].answer}</td>
                    <td>{data[9].answer}</td>
                  </tr>
                )
              }
            />
            {/* <Table striped bordered hover style={{ textAlign: 'center' }} size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Phòng ban</th>
                  <th>Chi nhánh</th>
                  <th>Số điện thoại cá nhân</th>
                  <th>Thời gian khai báo</th>
                </tr>
              </thead>
              <tbody>
                {tableList}
              </tbody>
            </Table> */}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withCookies(MedicalListReport)

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
