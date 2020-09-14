import React, {Component} from 'react';
import {Pagination} from 'antd';

export default class PaginationBox extends Component {
    state = {
        currentPage: this.props.currentPage,
        totalPages: 50
    }

    onChange = (page) => {
        this.setState({
            currentPage: page,
        })
    }

    render() {
        const {totalPages, currentPage} = this.state;
        return (
            <Pagination className='pagination-box-wrapper'
                        onChange={this.onChange}
                        defaultCurrent={currentPage}
                        current={currentPage}
                        total={totalPages}/>
        )
    }
}