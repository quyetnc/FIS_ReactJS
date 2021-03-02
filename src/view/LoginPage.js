import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {
  Container, Row, Col, Table, Image
} from 'react-bootstrap'
import config from '../config'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class LoginPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
      username: '',
      password: '',
      loginSuccess: false,
      cookie: cookies.get('token')
    }
  }

  componentDidMount() {
  }

  handleLogin = async () => {
    await this.loginApi()
  }

  loginApi = async () => {
    console.log(this.state.username, this.state.password)
    await fetch(`${config.IPRMIS}/api/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.resultCode === 1 && data.data.medical_report_role === 'admin') {
          console.log(data)
          const { cookies } = this.props;
          cookies.set('token', data.data.token, { path: '/' })
          this.setState({
            loginSuccess: true
          }, () => {
            alert('Đăng nhập thành công !')
          })
        } else if (data.resultCode === 1) {
          const { cookies } = this.props;
          cookies.set('token_1', data.data.token, { path: '/' })
        } else {
          alert('Đăng nhập thất bại !')
        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (this.props.cookies.get('token') !== undefined) {
      return <Redirect to='/tdcmobileapp/fis/medical_report' />
    }
    return (
      <Container fluid={true}>
        <Row
          style={{
            boxSizing: 'border-box',
            // width: '100%',
            height: '100vh',
            paddingTop: '100px',
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: '#edece8'
          }}
        >
          <Col xs={12} sm={12} md={7} lg={3} xl={3}>
            <Card style={LoginCardStyle.Card}>
              <CardContent style={LoginCardStyle.Content}>
                <Typography variant="h5" component="h1" style={{ color: '#f07933', fontWeight: 'bold' }}>
                  Khai báo y tế
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Login
                </Typography>
                <TextField
                  id="standard-dense"
                  label="username"
                  margin="normal"
                  name="username"
                  style={{
                    width: '60%'
                  }}
                  onChange={(event) => {
                    this.setState({
                      username: event.target.value
                    })
                  }}
                // helperText={this.state.txtUsername}
                // error={this.state.wrongUsername}
                />
                <br />
                <TextField
                  id="standard-password-input"
                  label="password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  name="password"
                  style={{
                    width: '60%'
                  }}
                  onChange={(event) => {
                    this.setState({
                      password: event.target.value
                    })
                  }}
                // helperText={this.state.txtPassword}
                // error={this.state.wrongPassword}
                />
                <br />

                <Button variant="contained" color="primary" onClick={this.handleLogin} style={{ marginTop: '40px', width: '60%' }}>
                  Login
                </Button>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>


    )
  }

}

export default withCookies(LoginPage)
const LoginCardStyle = {
  Card: {
    boxSizing: 'border-box',
    textAlign: 'center',
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },

  Content: {
    marginTop: '30px',
    marginBottom: '30px',
  }
}
