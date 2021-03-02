import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Image
} from 'react-bootstrap'
import Header from '../component/Header'
import DetailTable from '../component/DetailTable'
import config from '../config'

class AppDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isFetching: false
    }
  }

  componentDidMount = async () => {
    this.setState({ isFetching: true })
    await this.getTableData()
  }

  getTableData = async () => {
    await fetch(`${config.IPLOCAL}/api/getBuildList?applicationId=${this.props.application._id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        data.data.forEach(data => {
          this.setState({
            data: [
              ...this.state.data,
              {
                _id: data._id,
                version: data.version,
                ios: data.ios,
                android: data.android,
                created_at: data.created_at,
                urlIos: `itms-services://?action=download-manifest&url=${data.ios}`
              }
            ]
          })
        })

      })
      .then(() => {
        this.setState({ isFetching: false })

      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>

        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/tdcmobileapp">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>
                <Image
                  src={this.props.application.iconUrl}
                  style={{ width: '20px', marginRight: '5px' }}
                  rounded />
                {this.props.application.name}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        {
          this.state.isFetching === false &&
          <Row>
            <Col g={12} md={12} xs={12}>
              <DetailTable tableData={this.state.data} />
            </Col>
          </Row>
        }

      </Container>
    )
  }

}

export default AppDetail