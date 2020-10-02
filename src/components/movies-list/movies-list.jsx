import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import './movies-list.css';
import MovieCard from '../movie-card';
import Spinner from '../spinner';
import ErrorBoundry from '../error-boundry';
import { compose, withService } from '../hoc';

const mapMethodsToProps = (service) => {
  return {
    getMovies: service.getMovies,
    getRated: service.getRatedMovies,
  };
};

class MoviesList extends Component {
  static defaultProps = {
    service: {},
    keyWord: '',
    currentPage: 1,
    getTotalResults: () => {},
    tab: '',
    sessionId: '',
    loading: true,
    getMovies: {},
    getRated: {},
  };

  static propTypes = {
    service: PropTypes.instanceOf(Object),
    keyWord: PropTypes.string,
    currentPage: PropTypes.number,
    getTotalResults: PropTypes.func,
    tab: PropTypes.string,
    sessionId: PropTypes.string,
    loading: PropTypes.bool,
    getMovies: PropTypes.instanceOf(Object),
    getRated: PropTypes.instanceOf(Object),
  };

  state = {
    moviesList: null,
  };

  componentDidMount() {
    this.updateList();
  }

  componentDidUpdate(prevProps) {
    if (!navigator.onLine) throw new Error('Poor Connection');
    const { keyWord, currentPage, tab, sessionId } = this.props;
    if (
      keyWord !== prevProps.keyWord ||
      currentPage !== prevProps.currentPage ||
      tab !== prevProps.tab ||
      sessionId !== prevProps.sessionId
    ) {
      this.updateList();
    }
  }

  updateList() {
    const { getMovies, getRated, keyWord, currentPage, getTotalResults, tab, sessionId } = this.props;

    const func =
      tab === 'search' ? getMovies(keyWord, currentPage, sessionId) : sessionId && getRated(sessionId, currentPage);
    return func.then((data) => {
      const moviesList = data[1];
      this.setState({ moviesList }, () => getTotalResults(data[0]));
      getTotalResults(data[0]);
    });
  }

  renderMovies(arr) {
    const { sessionId } = this.props;
    return arr.map(({ id, ...props }) => {
      return (
        <Col key={id} flex="left" xm={{ span: 16 }}>
          <MovieCard {...props} id={id} sessionId={sessionId} />
        </Col>
      );
    });
  }

  render() {
    const { moviesList } = this.state;
    const { loading } = this.props;

    if (!moviesList || loading) return <Spinner />;

    const movies = this.renderMovies(moviesList);

    return (
      <ErrorBoundry>
        <Row gutter={[32, 32]} justify="center">
          {movies}
        </Row>
      </ErrorBoundry>
    );
  }
}

export default compose(withService(mapMethodsToProps)(MoviesList));
