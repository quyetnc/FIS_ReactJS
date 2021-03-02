import React, { Component } from 'react'
import {
  Button,
  Image,
} from 'react-bootstrap'

class AppItem extends Component {
  render() {
    return (
      <Button
        style={styles.button}
        variant="light"
        onClick={this.props.handleClick}
        href={this.props.itemRoute}>
        <Image
          src={this.props.imageUrl}
          style={styles.icon}
          fluid
        />
        <p style={styles.appName}>
          {this.props.appName}
        </p>
      </Button>
    )
  }
}

export default AppItem

const styles = {
  button: {
    width: '100%',
    marginBottom: '30px'
  },
  image: {
    width: '80vw',
    height: '80vw'
  },
  icon: {
    marginTop: '20px'
  },
  appName: {
    marginTop: '20px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#245'
  }
}