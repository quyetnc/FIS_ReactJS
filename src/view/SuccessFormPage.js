import React, { Component } from 'react'
import {
  Image,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { CardMedia } from '@material-ui/core'
export default class SuccessFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      os: this.props.location.state !== undefined && this.props.location.state.os
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <Container style={{
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}>
        {/* <Row style={{
          textAlign: 'center',
          justifyContent: 'center',
          marginTop: '15vh',
        }}>
          <Col xs={10} sm={10} md={6} lg={4} xl={4}>
            <Image
              src={require('../assets/image/Tick-Orange.png')}
              style={{
                width: '40%',
                marginBottom: '30px'
              }}
              fluid
            />
            <h5>Gửi khai báo thành công</h5>
          </Col>
        </Row> */}

        <Row style={{
          textAlign: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}>
          {/* <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}> Chỉ thị 12 của TGĐ FPT: </p>

            <p style={{
              fontSize: '1.4em',
              marginBottom: '1.4em',
              fontWeight: '420',
            }}>

              Người FPT/FIS cài đặt ứng dụng
            <a href="https://www.bluezone.gov.vn/">
                <span style={{ fontWeight: 'bold', color: '#0166DE' }}> Bluezone </span>
              </a>
            để được cảnh báo nguy cơ lây nhiễm Covid-19
            </p> */}
          {/* {
              this.state.os === 'android'
                ?
                <a href="https://play.google.com/store/apps/details?id=com.mic.bluezone"> */}
          <Image
            src={require('../assets/image/img_covid.jpeg')}
            style={{
              height: '100vh'
            }}
            fluid
          />
          {/* <CardMedia
            // className={classes.Media}
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'contain'
            }}
            image={require('../assets/image/img_covid.jpeg')}
          /> */}
          {/* </a>
                : this.state.os === 'ios' ?
                  <a href="https://apps.apple.com/vn/app/bluezone/id1508062685?ls=1">
                    <Image
                      src={require('../assets/image/apple-store.svg')}
                      style={{
                        width: '50%',
                      }}
                      fluid
                    />
                  </a> :
                  <div>
                    <a href="https://apps.apple.com/vn/app/bluezone/id1508062685?ls=1">
                      <Image
                        src={require('../assets/image/apple-store.svg')}
                        style={{
                          width: '46%',
                        }}
                        fluid
                      />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.mic.bluezone">
                      <Image
                        src={require('../assets/image/android-store.svg')}
                        style={{
                          width: '50%',
                        }}
                        fluid
                      />
                    </a>
                  </div>
            }
 */}

        </Row>


      </Container>

    )
  }
}