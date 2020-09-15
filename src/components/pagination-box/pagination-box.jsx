import React, {Component} from 'react';
import {Pagination} from 'antd';

export default class PaginationBox extends Component {

    onChange = (page) => {
        console.log(page)
        const {changePage} = this.props;
        this.setState({
            currentPage: page,
        })
        changePage(page)
    }

    render() {
        const { currentPage, totalPages } = this.props;
        return (
            <Pagination className='pagination-box-wrapper'
                        onChange={this.onChange}
                        defaultCurrent={1}
                        current={currentPage}
                        total={totalPages}/>
        )
    }
}