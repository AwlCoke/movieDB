import React, {Component} from 'react';
import {Pagination} from 'antd';

export default class PaginationBox extends Component {
    state = {
        // currentPage: this.props.currentPage,
        totalPages: 50
    }

    onChange = (page) => {
        console.log(page)
        const {changePage} = this.props;
        this.setState({
            currentPage: page,
        })
        changePage(page)
    }

    render() {
        const {totalPages } = this.state;
        const { currentPage } = this.props;
        return (
            <Pagination className='pagination-box-wrapper'
                        onChange={this.onChange}
                        defaultCurrent={1}
                        current={currentPage}
                        total={totalPages}/>
        )
    }
}