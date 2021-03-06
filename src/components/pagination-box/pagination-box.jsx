import React from 'react';
import PropTypes from 'prop-types';
import { Button, Pagination } from 'antd';

const PaginationBox = ({ currentPage, totalResults, pageSize, changePage, loading }) => {
  const onChange = (page) => {
    changePage(page);
  };

  if (!totalResults && !loading) {
    return (
      <Button type="primary" style={{ margin: '20px auto' }}>
        There are no results
      </Button>
    );
  }

  return (
    !loading && (
      <Pagination
        className="pagination-box-wrapper"
        showSizeChanger={false}
        pageSize={pageSize}
        onChange={onChange}
        defaultCurrent={1}
        current={currentPage}
        total={totalResults}
      />
    )
  );
};

export default PaginationBox;

PaginationBox.defaultProps = {
  loading: true,
  currentPage: 1,
  totalResults: 1,
  pageSize: 1,
  changePage: () => {},
};

PaginationBox.propTypes = {
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
  totalResults: PropTypes.number,
  pageSize: PropTypes.number,
  changePage: PropTypes.func,
};
