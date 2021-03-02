import React, { Component, useState, useEffect } from 'react'
import {
  Container, Row, Col, Table, Image
} from 'react-bootstrap'

import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import base64 from 'base-64'
import config from '../config'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { Redirect } from 'react-router-dom'

export default class MedicalForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: this.props.match.params.username.replace('@fpt.com.vn', ''),
      selectedOption: [],
      loading: false,
      errorList: [],
      form: [],
      showDialog: false,
      message: '',
      successPage: false,
      checkbox: [],
      countryList: require('../assets/value/country.json'),
      cityList: require('../assets/value/city.json'),
      selectedCountry: [],
      selectedCity: [],
      corona: false,

      os: '',
      success: false
    }
    // this.checkValue = React.createRef()
  }

  loadData = async () => {
    let { form } = this.state
    await this.setState({ loading: true })
    await fetch(`${config.IPRMIS}/api/get_medical_form?username=${this.props.match.params.username.replace('@fpt.com.vn', '')}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
    })
      .then(response => {
        this.setState({ loading: false })
        return response.json()
      })
      .then(data => {

        if (data.resultCode === -1) {
          this.setState({
            showDialog: true,
            message: data.message
          })
        }
        this.setState({
          form: data.data,
          os: data.os
        })
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        this.setState({
          showDialog: true,
          message: 'Không thể kết nối tới máy chủ'
        })
      })
    this.setState({ loading: false })
  }

  async componentDidMount() {
    await this.loadData()
    await fetch(`https://api.fis.vn:9999/mobilebuild/uploads/versionCode.json`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        return response.json()
      })
      .then(async data => {
        this.setState({
          corona: data.corona
        })
      })
  }

  checkData = async () => {
    let { form } = this.state
    await this.setState({
      errorList: []
    }, () => {
      for (const data of form) {
        if (data.answer === undefined || data.answer === null || data.answer === '' || data.answer.length <= 0 || data.answer === []) {
          this.state.errorList.push(data.id)
        } else if (data.sub_question !== undefined && data.sub_question.length > 0
          && data.answer !== 'Không' && data.answer !== 'Có và đã khai báo trong vòng 14 ngày' || data.answer.length <= 0) {
          for (const item of data.sub_question) {
            if (item.answer === undefined || item.answer === null || item.answer === ''
              || item.error === true || item.answer === [] || item.answer.length <= 0) {
              this.state.errorList.push(item.id)
            }
          }
        }
      }
    })
  }

  sendForm = async (event, data) => {
    let { form } = this.state
    await this.setState({ loading: true })
    await this.checkData()
    if (this.state.errorList.length <= 0) {
      await fetch(`${config.IPRMIS}/api/send_medical_form`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.props.match.params.username.replace('@fpt.com.vn', ''),
          questionList: data
        }),
        mode: 'cors',
      })
        .then(response => {
          this.setState({ loading: false })
          return response.json()
        })
        .then(async data => {
          this.setState({
            showDialog: true,
            message: data.message,
          })
          if (data.resultCode === 1) {
            this.setState({
              success: true,
            })
          }

        })
        .catch(err => {
          this.setState({
            showDialog: true,
            message: 'Không thể kết nối tới máy chủ'
          })
          console.log(err)
        })
    } else {
      let mess = 'Vui lòng điền đầy đủ thông tin '

      for (const err of this.state.errorList) {
        mess = mess + err + ' '
      }

      this.setState({
        showDialog: true,
        message: 'Vui lòng điền đầy đủ thông tin !!!'
      })
    }
    await this.setState({ loading: false })
  }

  handleChange = (event, id) => {
    let { selectedOption, errorList } = this.state
    let index = selectedOption.findIndex(
      function (element) {
        return element.id === id;
      }
    )
    if (index !== -1) {
      let data = this.state.selectedOption
      data[index] = {
        id: id,
        value: event.target.value
      }
      this.setState({
        selectedOption: data
      })
    } else {
      this.setState({
        selectedOption: [
          ...this.state.selectedOption,
          {
            id: id,
            value: event.target.value
          }
        ]
      })
    }

  }

  handleClose = () => {
    this.setState({
      showDialog: !this.state.showDialog
    }, () => {
      if (this.state.success) {
        this.setState({
          successPage: true
        })
      }
    })
  }

  handleChangeCheckBox = (item) => {
    console.log(item)
  }

  render() {
    let { corona, selectedOption, errorList, form, showDialog, message, successPage, checkbox, countryList, cityList } = this.state
    if (successPage) {
      if (!corona) {
        return <Redirect to={{
          pathname: '/tdcmobileapp/successpage',
          state: { os: this.state.os }
        }} />
      } else {
        return <Redirect to='/redirect_corona' />
      }
    }
    console.log(form)
    return (
      <Container>
        {
          <Dialog
            style={{
              textAlign: 'center',
            }}
            onClose={this.handleClose}
            // aria-labelledby="customized-dialog-title"
            open={showDialog}>
            <p
              style={{
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 20
              }}
            >{message}</p>
            <Button onClick={this.handleClose} color="primary">
              Đóng
            </Button>
          </Dialog>
        }
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

        {/* <Row
          style={{
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          <Col xs={12} sm={12} md={12} lg={12} xl={12}> */}
        {
          form.map(data =>
            <div>
              <p style={styles.label}>
                {`${data.id}. ${data.question}`}
                {
                  data.new &&
                  <span style={{
                    backgroundColor: 'red',
                    color: '#ffffff',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    fontSize: '12px',
                    borderRadius: '15px',
                    marginLeft: '5px'
                  }}>
                    New
                </span>
                }

              </p>
              {
                (data.type === "radio")
                  ? <RadioView data={data} />
                  : (data.type === "checkbox")
                    ? <CheckBoxView data={data} />
                    : <TextView data={data} />
              }

            </div>
          )
        }
        <Row
          style={{
            marginTop: '20px',
            marginBottom: '10px',
            textAlign: 'center'
          }}
        >
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              style={{
                width: '100%',
                backgroundColor: '#f07933',
                fontWeight: 'bold'
              }}
              variant="contained"
              color="primary"
              onClick={(event) => {

                this.sendForm(event, form)
                // console.log(form)
              }}
            >
              Gửi khai báo
        </Button>
          </Col>
        </Row>
        {/* </Col>
        </Row> */}
      </Container>
    )
  }
}

const styles = {
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  subLabel: {
    fontSize: '15px',
    fontWeight: 'bold'
  }
}

function TextView(props) {
  const [text, setText] = useState(props.data.answer)

  let check = () => {
    console.log(11111)
  }
  // useEffect(
  //   console.log(this.refs.checkValue)
  //   , [text])

  return (
    <Container>
      <Row
        style={{
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        <TextField
          style={{
            width: '100%'
          }}
          rowsMax="4"
          multiline
          id="outlined-required"
          defaultValue={text}
          onChange={(event) => {
            setText(event.target.value)
            props.data.answer = event.target.value
            console.log(props.data)
            props.onChange !== undefined && props.onChange(event.target.value)
            // data.answer = event.target.value
          }}
          placeholder={props.data.placeholder}
          error={props.error}
        // error={}
        // helperText={errorList.includes(data.id) &&
        //   'Vui lòng nhập đầy đủ thông tin'}
        />
      </Row>
    </Container>
  )
}

function RadioView(props) {
  const [value, setValue] = React.useState(props.data.answer)
  const [showSub, setShowSub] = React.useState(false)
  return (
    <Container>
      <Row
        style={{
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        <RadioGroup
          aria-label=""
          name=""
          onChange={(event) => {
            props.data.answer = event.target.value
            setValue(event.target.value)
            if (props.data.disable_sub !== undefined) {
              let index = props.data.disable_sub.findIndex(item => item === event.target.value)
              if (index === -1) {
                setShowSub(true)
              } else {
                setShowSub(false)
              }
            }
          }}>
          {
            props.data.options.map(data =>
              <div>
                <FormControlLabel
                  style={data.new && { marginRight: '30px', }}
                  value={data.text}
                  control={<Radio />}
                  label={data.text}
                />
                {
                  data.new &&
                  <span style={{
                    backgroundColor: 'red',
                    color: '#ffffff',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    fontSize: '12px',
                    borderRadius: '15px',
                    position: 'absolute',
                    right: '10px',
                    marginTop: '10px'
                  }}>
                    New
                  </span>
                }
              </div>

            )
          }
        </RadioGroup>
        {
          (showSub) &&
          props.data.sub_question.map(data =>
            <div style={{ width: '100%' }}>
              <p style={styles.label}>
                {
                  `${data.id}. ${data.question}`
                }
                {
                  data.new &&
                  <span style={{
                    backgroundColor: 'red',
                    color: '#ffffff',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    fontSize: '12px',
                    borderRadius: '15px',
                    marginLeft: '5px'
                  }}>
                    New
                  </span>
                }
              </p>

              {
                (data.type === "radio")
                  ? <RadioView data={data} />
                  : (data.type === "checkbox")
                    ? <CheckBoxView data={data} />
                    : (data.type === "date")
                      ? <DatePickers data={data} />
                      : (data.type === "datetime")
                        ? <DateTimePickers data={data} />
                        : (data.type === "country")
                          ? <SelectView data={data} />
                          : <TextView data={data} />
              }
            </div>
          )
        }
      </Row>
    </Container>
  )
}

function CheckBoxView(props) {

  const [options, setOptions] = React.useState([])
  // for (const item of props.options) {
  //   options = 
  // }
  useEffect(() => {
    props.data.answer = options
  }, [options])

  return (
    <Container>
      <Row
        style={{
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        {
          props.data.options.map(item =>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    options.findIndex(
                      function (element) {
                        return element == item.id
                      }
                    ) !== -1
                  }
                  onChange={(event) => {
                    let index = options.findIndex(
                      function (element) {
                        return element == item.id
                      }
                    )

                    if (index === -1) {
                      setOptions([
                        ...options,
                        event.target.value
                      ])
                    } else {
                      options.splice(index, 1)
                      setOptions([...options])
                    }
                  }}
                  value={item.id} />
              }
              label={item.text}
            />
          )
        }

      </Row>
    </Container>
  )

}

function DatePickers(props) {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date())
  let convertTime = (date) => {
    let day = date.getUTCDate()
    if (day < 10) {
      day = '0' + day
    }
    let month = date.getUTCMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let year = date.getUTCFullYear()
    if (year < 10) {
      year = '0' + year
    }
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    let value = convertTime(fromDate)
    props.data.options[0].value = value
    props.data.answer = props.data.options[0].value + ' - ' + props.data.options[1].value
  }, [fromDate])

  useEffect(() => {
    let value = convertTime(toDate)
    props.data.options[1].value = value
    props.data.answer = props.data.options[0].value + ' - ' + props.data.options[1].value
  }, [toDate])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ width: '100%' }}>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <p style={styles.subLabel}>{props.data.options[0].text}</p>
          <DatePicker
            value={fromDate}
            onChange={(date) => {
              // let value = convertTime(date)
              setFromDate(date)
            }} />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <p style={styles.subLabel}>{props.data.options[1].text}</p>
          <DatePicker
            value={toDate}
            onChange={(date) => {
              // let value = convertTime(date)
              // props.data.options[1].value = value
              setToDate(date)
            }} />
        </Col>
      </Row>
      <Row>

      </Row>
    </MuiPickersUtilsProvider>
  );
}

function DateTimePickers(props) {
  const [datetime, setDatetime] = useState(new Date());
  let convertTime = (time) => {
    let day = time.getUTCDate()
    if (day < 10) {
      day = '0' + day
    }

    let month = time.getUTCMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let year = time.getUTCFullYear()

    let hours = time.getUTCHours()
    if (hours < 10) {
      hours = '0' + hours
    }
    let minutes = time.getUTCMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    let seconds = time.getUTCSeconds()
    if (seconds < 10) {
      seconds = '0' + seconds
    }

    let result = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
    return result
  }

  useEffect(() => {
    let value = convertTime(datetime)
    props.data.answer = value
  }, [datetime])

  // useEffect(() => {
  //   let value = convertTime(time)
  //   props.data.options[1].value = value
  // }, [time])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ width: '100%' }}>
      <DateTimePicker
        value={datetime}
        onChange={(date) => {
          setDatetime(date)
        }} />
    </MuiPickersUtilsProvider>
  )
}

function SelectView(props) {

  const [country, setCountry] = useState('Việt Nam')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [village, setVillage] = useState('')
  const [address, setAddress] = useState('')
  const [inputCountry, setInputCountry] = useState(false)
  const countryList = require('../assets/value/country.json')
  const cityList = require('../assets/value/city.json')

  useEffect(() => {
    props.data.answer = country
    if (country === 'Khác') {
      setInputCountry(true)
    } else {
      setInputCountry(false)
    }

    if (country === 'Việt Nam' && city === '') {
      props.data.error = true
    } else {
      props.data.error = false
    }

  }, [country])

  useEffect(() => {
    if (country === 'Việt Nam') {
      props.data.answer = `${country}, ${city}, ${district}, ${ward}, ${village}, ${address}`
      if (district !== '') {
        props.data.answer = `${country}, ${city}, ${district}`
      }
      if (ward !== '') {
        props.data.answer = `${country}, ${city}, ${district}, ${ward}`
      }
      if (village !== '') {
        props.data.answer = `${country}, ${city}, ${district}, ${ward}, ${village}`
      }
      if (village !== '') {
        props.data.answer = `${country}, ${city}, ${district}, ${ward}, ${village}, ${address}`
      }
      if (city === '' || district === '') {
        props.data.error = true
      } else {
        props.data.error = false
      }
    } else {
      props.data.answer = country
    }
  }, [city, district, ward, village, address])

  return (
    <Row
      style={{
        width: '100%',
        marginTop: '20px',
        marginBottom: '10px',
      }}
    >
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <Select
          style={{ width: '45%' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          onChange={(event) => {
            setCountry(event.target.value)
          }}
          defaultValue='Việt Nam'
          placeholder='Quốc gia'
        >
          {
            countryList.map(country =>
              <MenuItem value={country.name}>{country.name}</MenuItem>
            )
          }
        </Select>
        {
          (country === 'Việt Nam') &&
          <Select
            style={{ width: '45%', float: 'right' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            onChange={(event) => {
              setCity(event.target.value)
              props.data.answer = event.target.value

              // console.log(event.target.value)
              // props.data.answer = country + ' - ' + event.target.value
            }}
            placeholder='Tỉnh/Thành phố'
          >
            {
              cityList.map(city =>
                <MenuItem value={city.name}>{city.name}</MenuItem>
              )
            }
          </Select>
        }
        {
          inputCountry && <TextView data={props.data} />
        }
      </Col>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextView
          onChange={(text) => setDistrict(text)}
          data={{
            placeholder: 'Quận/Huyện/Thị xã'
          }}
          error={props.data.error}
        />
        <TextView
          onChange={(text) => setWard(text)}
          data={{
            placeholder: 'Xã/Phường/Thị trấn'
          }} />
        <TextView
          onChange={(text) => setVillage(text)}
          data={{
            placeholder: 'Làng/Thôn/Ấp'
          }} />
        <TextView
          onChange={(text) => setAddress(text)}
          data={{
            placeholder: 'Địa chỉ (Số nhà)'
          }} />
      </Col>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <p style={{
          color: '#ccc',
          fontSize: 14
        }}>
          Lưu ý: TH không xác định được thì ghi "Không xác định" hoặc KXĐ
        </p>
      </Col>
    </Row>

  )
}