import React, { Component } from 'react'
import Header from '../component/Header'
import DashboardItem from '../component/DashboardItem'
import {
  Container, Row, Col, Table,
  Button, Image, Form
} from 'react-bootstrap'
import config from '../config'
import PieChart from '../component/chartTypes/PieChart'
import LineChart from '../component/chartTypes/LineChart'


class RegisterPageCenGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      retypePassword: ''
    }
  }

  async componentDidMount() {
  }

  handleLogin = async () => {
    const { email, password, retypePassword } = this.state

    if (password.length < 6) {
      return alert('Password must have at least 6 characters !')
    }

    await fetch(`${config.IPCENGROUP}/api/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        retypePassword: retypePassword
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        alert(data.message)
        if (data.resultCode === 1) {
          this.setState({
            email: '',
            password: '',
            retypePassword: ''
          })
        }
      })
      .catch(err => console.log(err))
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  handleChangeRetypePassword = (e) => {
    this.setState({ retypePassword: e.target.value })
  }

  render() {
    return (
      <Container style={{ width: "100%" }}>
        <Row>
          <Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <p style={{
                color: '#f07933',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>CEN Group eTMS App</p>
            </Col>
          </Col>
        </Row>
        <Row style={{
          marginTop: '10px',
          marginBottom: '10px',
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          align: "center"
        }}>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            {/* <Form> */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: 'bold' }}>Email address</Form.Label>
              <Form.Control type="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontWeight: 'bold' }}>Retype Password</Form.Label>
              <Form.Control type="password" value={this.state.retypePassword} onChange={this.handleChangeRetypePassword} placeholder=" Retype password" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={() => this.handleLogin()}>
              Register
            </Button>

            {/* </Form> */}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RegisterPageCenGroup
