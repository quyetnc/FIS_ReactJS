import React, {useState, useEffect, useCallback} from 'react';
import "../assets/css/index.css";
import api, {apiCall} from '../utils/api';
import { Spinner, Col, Container, Row, Table} from "react-bootstrap";

function ListUserClaim() {
    const [claim, setClaim] = useState([]);
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        try {
            let getClaim = await apiCall("get", api.etms.getClaimReport());
            setClaim(getClaim);
            if(getClaim) {
                setLoading(true);
            }
        } catch(err) {
            console.error(err);
            setErrors("Something went wrong. Can't get any claim from database");
        }
    }, [setClaim, setLoading]);

    useEffect(() => {
        load();
    }, [load])

    return (
        <div>
            {
                loading === false
                ? <Row>
                    <Col md={{ span: 4, offset: 6 }} style={{ marginTop: '180px' }}>
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                    </Col>
                </Row>
                : <Container>
                    <Row className="label-header">
                        <Col>
                            <a href='/tdcmobileapp/fis/dashboard'>
                                <h1>Dashboard FIS Insight App</h1>
                            </a>
                        </Col>
                    </Row>
                    <Row className="table">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th style={{verticalAlign: "center"}}>No</th>
                                    <th>Full name</th>
                                    <th>Username</th>
                                    <th>Department</th>
                                    <th>Request Type</th>
                                    <th style={{width: "25%"}}>Reason</th>
                                    <th style={{width: "10%"}}>From date</th>
                                    <th style={{width: "10%"}}>To date</th>
                                    <th>Sent at</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    claim.length > 0
                                    ? claim.map((item, i) => (
                                        <tr key={i}>
                                            <th>{i + 1}</th>
                                            <td>{item.fullName}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.department}</td>
                                            <td>{item.requestType}</td>
                                            <td>{item.reason}</td>
                                            <td>{item.fromDate}</td>
                                            <td>{item.toDate}</td>
                                            <td>{item.timeSendRequest}</td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td colSpan="8">
                                            {
                                                errors !== ''
                                                ? errors
                                                : "No data here or server is error"
                                            }
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default ListUserClaim;