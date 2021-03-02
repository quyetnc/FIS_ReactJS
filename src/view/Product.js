import React, { Component } from 'react'
import Header from '../component/Header'
import AppItem from '../component/AppItem'
import {
  Container, Row, Col, Table,
  Button, Image
} from 'react-bootstrap'

class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount = async () => {
  }

  render() {
    return (
      <Container style={styles.container} fluid={true}>
        <Container style={styles.root} fluid={false}>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Row>
                <Row style={{ marginTop: '50px', marginBottom: '50px' }}>
                  <Col xs={6} sm={6} md={3} lg={4} xl={4}>
                    <Image style={{ width: '100%' }} src={require('../assets/image/FIS-INSIGHT-LOGO.png')} rounded />
                  </Col>
                  <Col>
                    <Image style={{ marginTop: '10px', alignSelf: 'center', }} src={require('../assets/image/logo.png')} fluid />
                    <h2 style={{
                      fontWeight: '1000',
                      color: 'white',
                      lineHeight: '1.3',
                      fontFamily: 'Roboto, sans- serif',
                    }}>
                      FIS Insight App
                    </h2>
                  </Col>
                </Row>
              </Row>
              <Row>
                <Row>
                  <Col xs={6} sm={6} md={5} lg={5} xl={5}>
                    <Image style={{ maxWidth: '100%', height: 'auto' }} src={require('../assets/image/FIS_home.JPEG')} thumbnail />
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Row style={{ marginTop: '20px' }}>
                      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <a href="https://apps.apple.com/us/app/fis/id1495617862"
                          style={{ marginRight: '20px', }}
                        >
                          <Button variant='outline-secondary'
                            style={{
                              fontWeight: 'bold',
                              width: '100%',
                              // backgroundColor: 'white',
                              color: 'white',
                              borderColor: 'white',
                              fontSize: '20px',
                              marginBottom: '30px'
                            }}>
                            IOS
                      </Button>
                        </a>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <a href="https://play.google.com/store/apps/details?id=com.tdc.mfu"
                        >
                          <Button variant='outline-secondary'
                            style={{
                              fontWeight: 'bold',
                              width: '100%',
                              fontSize: '20px',
                              // backgroundColor: '#f07933',
                              color: 'white',
                              borderColor: 'white'
                            }}>
                            Android
                      </Button>
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col xs={0} sm={0} md={{ span: 6, offset: 8 }} lg={{ span: 6, offset: 8 }} xl={{ span: 6, offset: 8 }} >
              <Image src={require('../assets/image/banner_img.png')} fluid style={{ marginTop: '50px' }}></Image>
            </Col>
          </Row>
          <Row style={{ marginTop: '30px', marginBottom: '10px', alignItem: 'center' }}>
            {/* <Image style={{ marginTop: '10px', alignSelf: 'center' }} src={require('../assets/image/logo.png')} fluid /> */}
          </Row>
          <Row>
            <Row>

              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <div>
                  <h4
                    style={{
                      fontWeight: '600',
                      color: '#333333',
                      fontSize: '18px',
                      lineHeight: '1.8',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  >Thông tin liên hệ</h4>
                  <p style={{
                    fontWeight: '300',
                    color: '#333333',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    fontFamily: 'Roboto, sans-serif'
                  }}>Duong Ngoc Long Nam</p>
                  <p style={{
                    fontWeight: '300',
                    color: '#333333',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    fontFamily: 'Roboto, sans-serif'
                  }}>Tầng 2, Trung tâm TDC HCM, Toà nhà FPT Tân Thuận 3, Q7</p>
                  <p style={{
                    fontWeight: '300',
                    color: '#333333',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    fontFamily: 'Roboto, sans-serif'
                  }}>Phone: (+84) 028.7300.7373 / 84407</p>
                  <p style={{
                    fontWeight: '300',
                    color: '#333333',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    fontFamily: 'Roboto, sans-serif'
                  }}>Email : namdnl@fpt.com.vn</p>
                </div>
              </Col>
            </Row>

          </Row>
        </Container>
      </Container>

    )
  }
}

const backgroundImage = require('../assets/image/banner_bg.png')
const styles = {
  container: {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center", /* Center the image */
    backgroundRepeat: "no-repeat", /* Do not repeat the image */
    backgroundSize: "cover",
    fontFamily: "Roboto, sans-serif"
  },
  root: {
    width: '100%',
    borderBottom: '0.5px solid #eff0ff',
  },
  title: {
    // color: '#f07933',
    background: 'linear-gradient(180deg, #f07933 30%, #F04579 60%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    fontSize: '2rem',
    fontWeight: 'bold'
  }
}
export default Product