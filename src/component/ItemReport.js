import React  from "react";
import {Col} from 'react-bootstrap'
const   ItemReport = props => {
    return (
        <>
          <Col className="text-center" xs={7} sm={7} md={7} lg={7} xl={7}>
            {" "}
          <p style={{color :props.color, fontWeight:'bold'}}> {props.title}</p> 
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          {props.value} ({props.ratio}%)
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            {" "}
            Cán bộ
          </Col>
        </>
      );
    }
export default ItemReport;