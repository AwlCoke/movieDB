import React, {Component} from "react";
import PropTypes from "prop-types";
import {Input} from "antd";
import debounce from 'lodash.debounce';

export default class SearchPanel extends Component {
    static defaultProps = {
        onSearch: () => {},
    }

    static propTypes = {
        onSearch: PropTypes.func,
    }

    state = {
        query: '',
    }

    onChange = (event) => {
        this.setState({
            query: event.target.value,
        });
    }

    onSubmit = (event) => {
        const {query} = this.state;
        const {onSearch} = this.props;
        event.preventDefault();
        onSearch(query);
    }

    render() {
        const {query} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <Input placeholder='Type to search...'
                       value={query}
                       onChange={this.onChange}
                       size='large'
                />
            </form>
        )
    }
}