import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Table, Form, Button, Spinner } from 'react-bootstrap';
import api, {apiCall} from '../utils/api';
import moment from 'moment';
import Datetime from 'react-datetime';
import "../../node_modules/react-datetime/css/react-datetime.css";
import "../assets/css/index.css";

function ListUserByCondition() {
    const [users, setUsers] = useState([]);
    const [closureDate, setClosureDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [mmEmail, setMMEmail] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const load = useCallback(async() => {
        try {
            let getUser = await apiCall("get", api.condition.getTodayCheckin());
            setUsers(getUser.data);
            if(getUser) {
                setLoading(true);
            }
        } catch(err) {
            console.error(err);
        }
    }, [setUsers]);

    useEffect(() => {
        load();
    }, [load]);

    async function hdSearch(email, date) {
        try {
            let filterUser;

            if(email !== '' && date !== undefined) {
                filterUser = await apiCall("get", api.condition.getByCondition(email, date));
            } else if(date !== undefined) {
                filterUser = await apiCall("get", api.condition.getUserByCheckinDate(date));
            }
            setUsers(filterUser.data);
        } catch (err) {
            setErrors("Your manager email or enter date is false");
            console.log(err);
        }
    }

    async function hdReload() {
        let users = await apiCall("get", api.condition.getTodayCheckin());
        setUsers(users.data);
        setMMEmail('');
        setClosureDate(moment(new Date()).format('YYYY-MM-DD'));
        setErrors('');
    }

    function hdChangeEmail(e) {
        setMMEmail(e.target.value);
    }

    function handleClosure(date) {
        setClosureDate(date);
    }

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
                        <Row className="search-area">
                            <Col md={7}>
                                <Form.Label>Email's manager</Form.Label>
                                <Form.Control
                                    placeholder="Enter manager email"
                                    type="email"
                                    value={mmEmail}
                                    onChange={hdChangeEmail}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Label>Sort date</Form.Label>
                                <Datetime
                                    inputProps={{ placeholder: "Datetime Picker Here" }}
                                    dateFormat="YYYY-MM-DD"
                                    value={closureDate}
                                    onChange={handleClosure}
                                    timeFormat={false}
                                />
                            </Col>
                            <Col md={3}>
                                <Button onClick={() => hdSearch(mmEmail, closureDate)}>Search user</Button>
                                <Button onClick={() => hdReload()} variant="success">Reload</Button>
                            </Col>
                        </Row>
                        <Row className="table">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Full name</th>
                                        <th>User name</th>
                                        <th>Email's manager</th>
                                        <th>Department</th>
                                        <th>Checkin</th>
                                        <th>Checkout</th>
                                        <th>Checkin_Wfh</th>
                                        <th>Checkout_Wfh</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        users.length > 0
                                            ? users.map((user, i) => (
                                                <tr key={i}>
                                                    <th>{i + 1}</th>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.manager_approver_email}</td>
                                                    <td>{user.department}</td>
                                                    <td>{user.checkinTime}</td>
                                                    <td>{user.checkoutTime}</td>
                                                    <td>{user.checkin_wfh}</td>
                                                    <td>{user.checkout_wtf}</td>
                                                </tr>
                                            ))
                                            : <tr>
                                                <td colSpan="9">
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
    );
}

export default ListUserByCondition;