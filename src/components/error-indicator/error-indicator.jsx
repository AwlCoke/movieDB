import React from 'react';
import './error-indicator.css';
import {Alert, Row} from "antd";

const ErrorIndicator = () => {

    return (
        <Row className="error-indicator" justify='center'>

            <Alert message='Oops!'
                   description='Something is wrong.
                               We are already working on it'
                   type='warning'/>
        </Row>
    );
};

export default ErrorIndicator;
