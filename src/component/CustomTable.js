import React, { Component } from 'react';
import {
  Container, Row, Col, Table, Image
} from 'react-bootstrap'
import ButtonBase from '@material-ui/core/ButtonBase'
import Icon from '@material-ui/core/Icon'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

class CustomTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 20
    }
  }

  handleChangePage = (type) => {
    if (type === 1 && this.state.page > 1) {
      this.setState({
        page: this.state.page - 1
      }, () => {
        this.props.handleClick(this.state.pageSize, this.state.page)
      })
    } else if (type === 2) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.props.handleClick(this.state.pageSize, this.state.page)
      })
    }
  }

  render() {
    let { columns, rowsData } = this.props
    return (
      <Row>
        <Table striped bordered hover style={{ textAlign: 'center' }} size="sm">
          <thead>
            <tr>
              {
                columns.map(data =>
                  <th>{data}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {this.props.item}
          </tbody>
        </Table>
        {
          this.props.isPagination &&
          <Row
            style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'right', width: '100%' }}
          >
            <FormControl style={{ marginRight: '20px' }}>
              <NativeSelect
                value={this.state.pageSize}
                onChange={(event) => {
                  this.setState({
                    pageSize: event.target.value,
                    page: 1
                  }, () => {
                    this.props.handleClick(this.state.pageSize, this.state.page)
                  })
                }}
                inputProps={{
                  name: 'age',
                  id: 'age-native-label-placeholder',
                }}
              >
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
                <option value={0}>All</option>
              </NativeSelect>
            </FormControl>
            <ButtonBase
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                borderWidth: '1px',
                backgroundColor: '#ccc',
              }}
              onClick={() => this.handleChangePage(1)}
            >
              <NavigateBeforeIcon />
            </ButtonBase>

            <p style={{ marginTop: '15px', marginLeft: '20px', marginRight: '20px' }}>
              Page: {this.state.page}
            </p>
            <ButtonBase
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ccc'
              }}
              onClick={() => this.handleChangePage(2)}
            >
              <NavigateNextIcon />
            </ButtonBase>
          </Row>
        }

      </Row>

    )
  }

}
CustomTable.defaultProps = {
  isPagination: true
}
export default CustomTable