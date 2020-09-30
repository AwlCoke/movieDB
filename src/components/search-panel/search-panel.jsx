import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './search-panel.css';
import ErrorBoundry from '../error-boundry';

export default class SearchPanel extends Component {
  static defaultProps = {
    onSearch: () => {},
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  state = {
    query: '',
  };

  onChange = (event) => {
    const { onSearch } = this.props;
    this.setState(
      {
        query: event.target.value,
      },
      () => {
        const { query } = this.state;
        onSearch(query);
      }
    );
  };

  onSubmit = (event) => {
    const { query } = this.state;
    const { onSearch } = this.props;
    event.preventDefault();
    onSearch(query);
  };

  render() {
    const { query } = this.state;
    return (
      <ErrorBoundry>
        <form onSubmit={this.onSubmit} className="search-panel">
          <Input placeholder="Type to search..." value={query} onChange={this.onChange} size="large" />
        </form>
      </ErrorBoundry>
    );
  }
}
