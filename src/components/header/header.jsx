import PropTypes from 'prop-types';
import React from 'react';
import SearchPanel from '../search-panel';

const Header = ({ onSearch }) => {
  return (
    <div className="search-panel-box">
      <SearchPanel onSearch={onSearch} />
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  onSearch: () => {},
};

export default Header;
