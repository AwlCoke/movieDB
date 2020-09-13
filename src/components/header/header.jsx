import PropTypes from 'prop-types';
import React from 'react';
import SearchPanel from '../search-panel';

const Header = ({onSearch}) => {
    return (
        < SearchPanel onSearch={onSearch}/>
    )
}

Header.propTypes = {
    onSearch: PropTypes.func,
}

Header.defaultProps = {
    onSearch: () => {},
}

export default Header;