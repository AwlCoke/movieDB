import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import { compose, withService } from '../../hoc';

const UserRating = (props) => {
  const { id, sessionId, userRate, rating, getUserRating, toRate } = props;

  const onChange = (value) => {
    getUserRating(value);
    return sessionId && toRate(id, sessionId, value);
  };

  return (
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
  );
};

const mapMethodsToProps = (service) => {
  return {
    toRate: service.rateMovie,
  };
};

UserRating.defaultProps = {
  toRate: {},
  userRate: 0,
  rating: 0,
  id: 0,
  sessionId: '',
  getUserRating: () => {},
};

UserRating.propTypes = {
  toRate: PropTypes.instanceOf(Object),
  userRate: PropTypes.number,
  rating: PropTypes.number,
  id: PropTypes.number,
  sessionId: PropTypes.string,
  getUserRating: PropTypes.func,
};

export default compose(withService(mapMethodsToProps)(UserRating));
