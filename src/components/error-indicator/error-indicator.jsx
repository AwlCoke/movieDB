import React from 'react';
import './error-indicator.css';
import {Alert} from "antd";
import logo from './there-is-no-need-to-be-upset.gif';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={logo} alt="error icon"/>
            <Alert message='Oops!'
                   description='Something has gone wrong.
                                But there is no need to be upset.
                                We are already working on it'
                   type='warning'/>
        </div>
    );
};

export default ErrorIndicator;
