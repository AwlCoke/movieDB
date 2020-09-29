import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

const UserRating = (props) => {
  const { userRate, rating, onChange } = props;

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

UserRating.defaultProps = {
  userRate: 0,
  rating: 0,
  onChange: () => {},
};

UserRating.propTypes = {
  userRate: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

export default UserRating;
