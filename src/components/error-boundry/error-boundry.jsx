import PropTypes from 'prop-types';
import React, {Component} from "react";
import ErrorIndicator from "../error-indicator";


export default class ErrorBoundry extends Component {

    static defaultProps = {
        children: {},
    };

    static propTypes = {
        children: PropTypes.instanceOf(Object),
    };

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true,
        });
    }

    render() {

        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) return < ErrorIndicator />

        return children;
    }

}