import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import MovieDbService from '../../services/movie-db-service';
import ErrorBoundry from '../error-boundry';

const UserRating = (props) => {
  const { id, sessionId, userRate, rating, getUserRating } = props;
  const movieDBService = new MovieDbService();

  const onChange = (value) => {
    getUserRating(value);
    return sessionId && movieDBService.rateMovie(id, sessionId, value);
  };

  return (
    <ErrorBoundry>
      <form action="" method="post">
        <Rate
          allowHalf
          allowClear
          count="10"
          value={userRate || rating}
          defaultValue={0}
          className="stars"
          onChange={onChange}
        />
      </form>
    </ErrorBoundry>
  );
};

UserRating.defaultProps = {
  userRate: 0,
  rating: 0,
  id: 0,
  sessionId: '',
  getUserRating: () => {},
};

UserRating.propTypes = {
  userRate: PropTypes.number,
  rating: PropTypes.number,
  id: PropTypes.number,
  sessionId: PropTypes.string,
  getUserRating: PropTypes.func,
};

export default UserRating;
