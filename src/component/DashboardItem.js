import React, { Component } from 'react'
import Header from '../component/Header'
import AppItem from '../component/AppItem'
import {
  Container, Row, Col, Table,
  Button, Image
} from 'react-bootstrap'


class DashboardItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let item = this.props.item
    let itemStyle = (item === '1') ? styles.info1 : ((item === '2') ? styles.info2 : ((item === '3') ? styles.info3 : ((item === '4') ? styles.info4 : styles.info5)))

    return (
      <a style={styles.link} href={this.props.href}>
        <Container style={styles.container}>
          <Row style={itemStyle}>
            <Col>
              <p style={styles.title}>{this.props.title}</p>
              <h2 style={styles.content}>{this.props.content}</h2>
            </Col>
          </Row>
        </Container>
      </a>

    )
  }
}

export default DashboardItem

const gradient = {
  item1: 'linear-gradient(315deg, #e4eee9 0%, #93a5ce 74%)',
  item2: 'linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)',
  item3: 'linear-gradient(315deg, #fc9842 0 %, #fe5f75 74 %)',
  item4: 'linear-gradient(90deg, rgba(254,203,151,1) 0%, rgba(254,210,114,1) 40%)',
  item5: 'linear-gradient(162deg, rgba(180,58,91,1) 0%, rgba(236,169,182,1) 100%, rgba(29,184,253,1) 100%)'
}
const styles = {
  container: {
    width: '100%',
    height: '100%',
    boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',
    borderRadius: 5,

  },
  info1: {
    // width: '40%',
    backgroundColor: '#e4eee9',

    height: '100%',
    background: gradient.item1,
    fontWeight: 'bold'
  },
  info2: {
    backgroundColor: '#abe9cd',

    // width: '40%',
    height: '100%',
    background: gradient.item2,
    fontWeight: 'bold'
  },
  info3: {
    backgroundColor: '#fc9842',
    // width: '40%',
    height: '100%',
    background: gradient.item3,
    fontWeight: 'bold'
  },
  info4: {
    // width: '40%',
    height: '100%',
    background: gradient.item4,
    fontWeight: 'bold'
  },
  info5: {
    // width: '40%',
    height: '100%',
    background: gradient.item5,
    fontWeight: 'bold'
  },
  title: {
    color: 'white',
    marginLeft: '20px',
    marginRight: '20px',
    paddingTop: '20px',
    fontWeight: 'bold',
    fontSize: '18px',
    fontFamily: 'Roboto, sans-serif',
    textDecoration: 'none'
  },
  content: {
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: '20px',
    textAlign: 'right',
    paddingRight: '20px',
    fontFamily: 'Roboto, sans-serif',
    textDecoration: 'none'
  },
  link: {
    textDecoration: 'none'

  }
}