import React, {Component} from 'react';
import {Pagination} from 'antd';

export default class PaginationBox extends Component {
    state = {
        currentPage: null,
        totalPages: null
    }

    render() {
        const {currentPage, totalPages} = this.state;
        return (
            <Pagination defaultCurrent={currentPage}
                        total={totalPages}/>
        )
    }
}