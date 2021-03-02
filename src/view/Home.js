// import React, { Component } from 'react'
// import Header from '../component/Header'
// import AppItem from '../component/AppItem'
// import { Container, Row, Col } from 'react-bootstrap'
// import config from '../config'

// class Home extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       data: []
//     }
//   }

//   componentDidMount = async () => {
//     await this.getApplicationList()
//     console.log(this.state.data)
//   }

//   getApplicationList = async () => {
//     await fetch(`${config.IPLOCAL}/api/getApplicationList`, {
//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         data.data.forEach(data => {
//           this.setState({
//             data: [
//               ...this.state.data,
//               { _id: data._id, name: data.name, iconURL: data.iconURL }
//             ]
//           })
//         })

//       })
//       .catch(err => console.log(err))
//   }

//   render() {
//     const listApplication = this.state.data.map((data, index) =>
//       <Col lg={2} md={2} xs={6} key={index}>
//         <AppItem
//           style={{ marginBottom: '20px' }}
//           imageUrl={data.iconURL}
//           appName={data.name}
//           itemRoute={`tdcmobileapp/${data.name}`}
//         />
//       </Col>
//     )
//     return (
//       <Container>
//         <Row>
//           <Col>
//             <Header />
//           </Col>
//         </Row>
//         <Row style={{ marginTop: '20px' }}>
//           {listApplication}
//           {/* {
//             this.state.data.map(data => {
//               <Col lg={2} md={2} xs={6}>
//                 <AppItem
//                   imageUrl={data.iconURL}
//                   appName={data.name}
//                   itemRoute={data.name}
//                 />
//               </Col>
//             })
//           } */}
//           {/* <Col lg={2} md={2} xs={6}>
//             <AppItem
//               imageUrl='https://www.dropbox.com/s/uuj0kgd06vezgvz/eLeaning_white_ios.png?dl=1'
//               appName='eLearning'
//               itemRoute='/eLearning'
//             />
//           </Col>
//           <Col lg={2} md={2} xs={6}>
//             <AppItem
//               imageUrl='https://www.dropbox.com/s/8e5yspfk2hibi9f/FIS-INSIGHT-002.png?dl=1'
//               appName='Mobile4Fiser'
//               itemRoute='/mobile4Fiser'
//             />
//           </Col> */}
//         </Row>
//       </Container>
//     )
//   }
// }

// export default Home

import React, { Component } from 'react'
import Header from '../component/Header'
import AppItem from '../component/AppItem'
import { Container, Row, Col } from 'react-bootstrap'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount = async () => {
  }

  render() {
    const listApplication = this.props.data.map((data, index) =>
      <Col lg={2} md={2} xs={6} key={index}>
        <AppItem
          imageUrl={data.iconURL}
          appName={data.name}
          itemRoute={`tdcmobileapp/${data.name}`}
        />
      </Col>
    )
    return (
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          {listApplication}
        </Row>
      </Container>
    )
  }
}

export default Home