import React, {Component} from 'react';
import {Pagination} from 'antd';

export default class PaginationBox extends Component {

    onChange = (page) => {
        const {changePage} = this.props;
        this.setState({
            currentPage: page,
        })
        changePage(page)
    }

    render() {
        const { currentPage, totalResults, pageSize } = this.props;
        return (
            <Pagination className='pagination-box-wrapper'
                        showSizeChanger={false}
                        pageSize={20}
                        onChange={this.onChange}
                        defaultCurrent={1}
                        current={currentPage}
                        total={totalResults}/>
        )
    }
}