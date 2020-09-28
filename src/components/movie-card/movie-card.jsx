import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Rate, Empty, Skeleton } from 'antd';
import './movie-card.css';
import { format } from 'date-fns';
import Spinner from '../spinner';
import MovieGenres from '../movie-genres';
import MovieDbService from '../../services/movie-db-service';

export default class MovieCard extends Component {
  static defaultProps = {
    description: '',
    posterUrl: null,
    title: '',
    votes: 0,
    releaseDate: '',
    genres: [],
    id: 0,
    sessionId: '',
    rating: 0,
  };

  static propTypes = {
    description: PropTypes.string,
    posterUrl: PropTypes.string,
    title: PropTypes.string,
    votes: PropTypes.number,
    releaseDate: PropTypes.string,
    genres: PropTypes.instanceOf(Array),
    id: PropTypes.number,
    sessionId: PropTypes.string,
    rating: PropTypes.number,
  };

  movieDBService = new MovieDbService();

  state = {
    userRate: 0,
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  onChange = (value) => {
    const { sessionId, id } = this.props;
    this.setState({ userRate: value });
    this.movieDBService.rateMovie(id, sessionId, value);
  };

  render() {
    const estimates = {
      low: '#E90000',
      middle: '#E97E00',
      high: '#E9D100',
      veryHigh: '#66E900',
    };

    const { description, posterUrl, title, votes, releaseDate, genres, rating } = this.props;

    const { loading, userRate } = this.state;

    let styled;

    if (votes < 3) {
      styled = `${estimates.low}`;
    } else if (votes < 5) {
      styled = `${estimates.middle}`;
    } else if (votes < 7) {
      styled = `${estimates.high}`;
    } else styled = `${estimates.veryHigh}`;

    const count = genres.length;

    const toValid = (date) => {
      if (date instanceof Date && !Number.isNaN(date)) return date;
      if (!Number.isNaN(new Date(date).getTime())) return new Date(date).getTime();
      return NaN;
    };

    const formatDate = (date) => {
      const res = toValid(date);
      return !Number.isNaN(res) ? format(res, 'do MMMM yyyy') : 'Date of release is unknown';
    };

    const shorten = (text, limit) => {
      const max = limit < 4 ? 165 : 120;
      const substr = text.slice(0, max).split(' ').slice(0, -1);
      return text && text.length > max ? `${substr.join(' ')}...` : text;
    };

    const shortly = shorten(description, count);

    const date = formatDate(releaseDate);

    const poster =
      posterUrl != null ? (
        <img className="poster" src={posterUrl} alt={`poster of ${title}`} />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ width: 200 }} />
      );

    const { Meta } = Card;

    if (loading) return <Spinner />;

    return (
      <>
        <Card loading={loading} hoverable bordered={false} className="movieCard" cover={poster}>
          <Skeleton loading={loading}>
            <Meta title={title} className="title" />

            <Button
              className="averageVote"
              style={{ color: 'darkgray', fontWeight: 600, borderWidth: 2, borderColor: styled }}
              shape="circle"
            >
              {votes}
            </Button>

            <div className="releaseDate" style={{ marginTop: 10, marginBottom: 10 }}>
              {date}
            </div>

            <div className="genresBox">
              <MovieGenres genres={genres} loading={loading} />
            </div>

            <div className="description">{shortly}</div>

            <form action="" method="post">
              <Rate
                allowHalf
                allowClear
                count="10"
                value={userRate || rating}
                defaultValue={0}
                className="stars"
                onChange={this.onChange}
              />
            </form>
          </Skeleton>
        </Card>
      </>
    );
  }
}
