import React from 'react';
import './error-indicator.css';
import {Alert, Col, Row} from "antd";
import logo from './there-is-no-need-to-be-upset.gif';

const ErrorIndicator = () => {

    return (
        <Row className="error-indicator" justify='center'>
            {/*<Col>*/}
            {/*    <img src={logo} alt="error icon"/>*/}
            {/*</Col>*/}
            <Alert message='Oops!'
                   description='Something has gone wrong.
                               We are already working on it'
                   type='warning'/>
        </Row>
    );
};

export default ErrorIndicator;
