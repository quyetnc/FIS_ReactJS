import React, { Component } from 'react'
import {
  Table,
  Button
} from 'react-bootstrap'

class DetailTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.tableData
    }
  }

  componentDidMount = () => {
    this.setState({ data: this.props.tableData })

  }
  convertDay = (date) => {
    let day = new Date(date)
    return `${day.getUTCDate()}/${day.getUTCMonth() + 1}/${day.getUTCFullYear()}`
  }
  convertTime = (date) => {
    let day = new Date(date)
    return `${day.getHours()}:${day.getMinutes()}`
  }
  render() {
    const itemList = this.state.data.map((data, index) =>
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{data.version}</td>
        <td>{`${this.convertDay(data.created_at)}`}</td>
        <td>
          <a variant="link" href={data.android}>Install</a>
        </td>
        <td>
          <a
            variant="link"
            onClick={() => {
              var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                navigator.userAgent &&
                navigator.userAgent.indexOf('CriOS') == -1 &&
                navigator.userAgent.indexOf('FxiOS') == -1
              if (isSafari === false) {
                alert('Vui lòng sử dụng trình duyệt safari để tải xuống')
                return
              }
            }}
            href={data.urlIos}
          >
            Install
          </a>
        </td>
      </tr>
    )
    return (
      <Table striped bordered hover style={{ textAlign: 'center' }} size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Version</th>
            <th>Date</th>
            <th>Android</th>
            <th>iOS</th>
          </tr>
        </thead>
        <tbody>
          {itemList}
        </tbody>
      </Table>
    )
  }

}

export default DetailTable