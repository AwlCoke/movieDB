import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import MovieDbService from '../../services/movie-db-service';
import './movies-list.css';
import MovieCard from '../movie-card';
import Spinner from '../spinner';
import ErrorBoundry from '../error-boundry';

export default class MoviesList extends Component {
  static defaultProps = {
    keyWord: '',
    currentPage: 1,
    getTotalResults: () => {},
    tab: '',
    sessionId: '',
    loading: true,
  };

  static propTypes = {
    keyWord: PropTypes.string,
    currentPage: PropTypes.number,
    getTotalResults: PropTypes.func,
    tab: PropTypes.string,
    sessionId: PropTypes.string,
    loading: PropTypes.bool,
  };

  movieDBService = new MovieDbService();

  state = {
    moviesList: null,
  };

  componentDidMount() {
    this.updateList();
  }

  componentDidUpdate(prevProps) {
    const { keyWord, currentPage, tab } = this.props;
    if (keyWord !== prevProps.keyWord || currentPage !== prevProps.currentPage || tab !== prevProps.tab) {
      this.updateList();
    }
  }

  updateList() {
    const { keyWord, currentPage, getTotalResults, tab, sessionId } = this.props;
    if (tab === 'search') {
      this.movieDBService.getMovies(keyWord, currentPage).then((data) => {
        const moviesList = data[1];
        this.setState({ moviesList }, () => getTotalResults(data[0]));
        getTotalResults(data[0]);
      });
    }
    if (tab === 'rated') {
      this.movieDBService.getRatedMovies(sessionId, currentPage).then((data) => {
        const moviesList = data[1];
        this.setState({ moviesList }, () => getTotalResults(data[0]));
        getTotalResults(data[0]);
      });
    }
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
