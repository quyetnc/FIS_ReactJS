import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
      <div style={styles.root}>
        <a href='/tdcmobileapp' style={{ textDecoration: 'none' }}>
          <p style={styles.title}>TDC Mobile App</p>
        </a>
        <a href='/tdcmobileapp/admin/login' style={{
          position: 'absolute',
          right: '20px',
          top: 0,
        }}>
          <p style={{
            color: '#50B0FF',
            fontSize: '1rem',
            textDecoration: 'underline'
          }}>Đăng nhập</p>
        </a>
      </div>
    )
  }
}

export default Header

const styles = {
  root: {
    width: '100%',
    borderBottom: '0.5px solid #eff0ff',
    marginTop: '10px'
  },
  title: {
    color: '#f07933',
    fontSize: '2rem'
  }
}