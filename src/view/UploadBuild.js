import React, { Component } from 'react'
import Header from '../component/Header'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import config from '../config'

class UploadBuild extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appData: this.props.data,
      value: '',
      IOSFile: null,
      AndroidFile: null,
      version: '',
      uploading: false
    }
    this.fileInputIOS = React.createRef()
    this.fileInputAndroid = React.createRef()
  }


  handleSubmit = (event) => {
    let { IOSFile, AndroidFile, value, version } = this.state
    if (value === null || value === '') {
      return alert('Vui lòng chọn ứng dụng !')
    }
    if (version === null || version === '') {
      return alert('Vui lòng điền phiên bản !')
    }
    this.uploadFile()
  }

  componentDidMount() {
    console.log(this.state.appData)
  }

  onChangeIOS = (e) => {
    this.setState({ IOSFile: e.target.files[0] })
  }

  onChangeAndroid = (e) => {
    this.setState({ AndroidFile: e.target.files[0] })
  }

  handleChangeVersion = (e) => {
    this.setState({ version: e.target.value }, () => console.log(this.state.version))
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value }, () => { console.log(this.state.value) });
  }

  uploadFile = async () => {
    await this.setState({ uploading: true })
    let { IOSFile, AndroidFile, value, version } = this.state
    let formData = new FormData()
    formData.append('appId', value)
    formData.append('ios', IOSFile)
    formData.append('android', AndroidFile)
    formData.append('version', version)

    return fetch(`${config.IPLOCAL}/api/uploadFile`, {
      method: "POST",
      headers: {
      },
      body: formData,
    })
      .then(response => { return response.json() })
      .then(async data => {
        await this.setState({ uploading: false }, () => {
          alert(data.message)

        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const dropDownItem = this.props.data.map((data, index) =>
      <option value={data._id}>
        {data.name}
      </option>
    )

    return (
      <Container style={{ width: '100%', height: '100vh' }}>
        {
          (this.state.uploading === true) &&
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

        <Row>
          <Col lg={12} md={12} xs={12}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} xs={12}>
            <Row style={{ marginBottom: 20, marginTop: 20 }}>
              <Col lg={12} md={12} xs={12}>
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="">--Please choose an application--</option>
                  {dropDownItem}
                </select>
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col lg={12} md={12} xs={12}>
                <span style={{ marginRight: '50px' }}>IOS</span>
                <input type="file" id="input" onChange={this.onChangeIOS} ref={this.fileInputIOS} />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col lg={12} md={12} xs={12}>
                <span style={{ marginRight: '20px' }}>Android</span>
                <input type="file" id="input" onChange={this.onChangeAndroid} ref={this.fileInputAndroid} />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col lg={12} md={12} xs={12}>
                <span style={{ marginRight: '20px' }}>Version</span>
                <input type="text" id="input" value={this.state.version} onChange={this.handleChangeVersion} />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col lg={12} md={12} xs={12}>
                <Button variant="outline-danger" onClick={() => this.handleSubmit()}>Submit</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }

}

export default UploadBuild