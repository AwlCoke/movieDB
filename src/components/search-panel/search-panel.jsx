import React, {Component} from "react";
import PropTypes from "prop-types";
import {Input} from "antd";
import debounce from 'lodash.debounce';
import MovieDbService from '../../services/movie-db-service';

export default class SearchPanel extends Component {
    static defaultProps = {
        onSearch: () => {},
    }

    static propTypes = {
        onSearch: PropTypes.func,
    }

    movieDBService = new MovieDbService();

    state = {
        query: '',
    }

    onChange = (event) => {
        const {query} = this.state;
        const {onSearch} = this.props;
        this.setState({
            query: event.target.value,
        });
        const debounceSearch = debounce((arg) => onSearch(arg), 1000);
        debounceSearch(query);
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
                />
            </form>
        )
    }
}