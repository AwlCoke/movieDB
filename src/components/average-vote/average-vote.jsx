import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const AverageVote = ({ votes }) => {
  const estimates = {
    low: '#E90000',
    middle: '#E97E00',
    high: '#E9D100',
    veryHigh: '#66E900',
  };

  let styled;

  if (votes < 3) {
    styled = `${estimates.low}`;
  } else if (votes < 5) {
    styled = `${estimates.middle}`;
  } else if (votes < 7) {
    styled = `${estimates.high}`;
  } else styled = `${estimates.veryHigh}`;

  return (
    <Button
      className="averageVote"
      shape="circle"
      style={{ color: 'darkgray', fontWeight: 600, borderWidth: 2, borderColor: styled }}
    >
      {votes}
    </Button>
  );
};

AverageVote.defaultProps = {
  votes: 0,
};

AverageVote.propTypes = {
  votes: PropTypes.number,
};

export default AverageVote;
