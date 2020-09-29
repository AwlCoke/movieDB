import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Empty, Skeleton } from 'antd';
import './movie-card.css';
import MovieGenres from '../movie-genres';
import MovieDbService from '../../services/movie-db-service';
import ReleaseDate from '../release-date';
import AverageVote from '../average-vote';
import Description from '../description';
import UserRating from '../user-rating';
import ErrorBoundry from '../error-boundry';

const MovieCard = (props) => {
  const movieDBService = new MovieDbService();

  const [userRate, setUserRate] = useState(0);

  const [loading, setLoading] = useState(true);

  const { sessionId, id, description, posterUrl, title, votes, releaseDate, genres, rating } = props;

  useEffect(() => {
    setLoading(false);
  }, []);

  const onChange = (value) => {
    setUserRate(value);
    movieDBService.rateMovie(id, sessionId, value);
  };

  const poster =
    posterUrl != null ? (
      <img className="poster" src={posterUrl} alt={`poster of ${title}`} />
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ width: 200 }} />
    );

  const { Meta } = Card;

  return (
    <ErrorBoundry>
      <Card hoverable bordered={false} className="movieCard" cover={poster}>
        <Skeleton loading={loading}>
          <Meta title={title} className="title" />
          <AverageVote votes={votes} />
          <ReleaseDate releaseDate={releaseDate} />
          <MovieGenres genres={genres} loading={loading} />
          <Description description={description} count={genres.length} />
          <UserRating userRate={userRate} rating={rating} onChange={onChange} />
        </Skeleton>
      </Card>
    </ErrorBoundry>
  );
};

MovieCard.defaultProps = {
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

MovieCard.propTypes = {
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

export default MovieCard;
