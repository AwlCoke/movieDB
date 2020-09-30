import React from 'react';
import { format } from 'date-fns';
import './release-date.css';
import PropTypes from 'prop-types';

const ReleaseDate = ({ releaseDate }) => {
  const toValid = (date) => {
    if (date instanceof Date && !Number.isNaN(date)) return date;
    if (!Number.isNaN(new Date(date).getTime())) return new Date(date).getTime();
    return NaN;
  };

  const formatDate = (date) => {
    const res = toValid(date);
    return !Number.isNaN(res) ? format(res, 'do MMMM yyyy') : 'Date of release is unknown';
  };

  const date = formatDate(releaseDate);

  return <div className="releaseDate">{date}</div>;
};

ReleaseDate.defaultProps = {
  releaseDate: '',
};

ReleaseDate.propTypes = {
  releaseDate: PropTypes.string,
};

export default ReleaseDate;
