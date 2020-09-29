import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ description, count }) => {
  const shorten = (text, limit) => {
    const max = limit < 4 ? 165 : 120;
    const substr = text.slice(0, max).split(' ').slice(0, -1);
    return text && text.length > max ? `${substr.join(' ')}...` : text;
  };

  const shortly = shorten(description, count);

  return <div className="description">{shortly}</div>;
};

Description.defaultProps = {
  description: '',
  count: 0,
};

Description.propTypes = {
  description: PropTypes.string,
  count: PropTypes.number,
};

export default Description;
