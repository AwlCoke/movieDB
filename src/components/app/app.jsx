import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import './app.css';
import { Col, Layout, PageHeader, Row, Tabs } from 'antd';
import MoviesList from '../movies-list';
import Header from '../header';
import PaginationBox from '../pagination-box';
import ErrorBoundry from '../error-boundry';
import MovieDbService from '../../services/movie-db-service';
import { MovieDBServiceProvider } from '../context';

const { TabPane } = Tabs;

export default class App extends Component{

    state = {
        loading: true,
        genresList: [],
        service: new MovieDbService(),
        keyWord: '',
        currentPage: 1,
        totalResults: 200,
        pageSize: 20
    }

    componentDidMount() {
        const genres = this.getGenres();
        genres.then(res => {
            this.setState({
                genresList: res,
                loading: false
            });
        });
    };

    getGenres = async() => {
        const { service } = this.state
        const genres =  await service.getAllGenres();
        return genres;
    };

    onSearch = (value) => {
        this.setState({
            keyWord: value,
            currentPage: 1
        });
    }

    // eslint-disable-next-line react/sort-comp
    handlerSearch = debounce(this.onSearch.bind(this), 500);

    getTotalResults = (totalResults) => {
        this.setState({totalResults})
    }

    changePage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }

    render() {

        const { loading, genresList, keyWord, currentPage, totalResults, pageSize } = this.state;

        const title = keyWord ? `Results for "${keyWord.toUpperCase()}"` : 'Top 200 Rated Movies'

        return (
            <MovieDBServiceProvider value={  genresList  }>
                <ErrorBoundry>
                    <Layout className='content-wrapper'
                            style={{backgroundColor:'white'}}>

                        <PageHeader title=''
                                    className='content-header'>

                            <Tabs>
                                <TabPane tab='Search' key="1" />
                                <TabPane tab='Rated' key="2" />
                            </Tabs>

                        </PageHeader>

                        <Row gutter={[16, 32]}
                             justify='center'>
                            <Col span={16} style={{padding:0}}>
                                <Header onSearch={this.handlerSearch}/>
                            </Col>
                        </Row>

                        <h1 style={{ textAlign:'center',
                                     color:'darkgray',
                                     marginBottom: 20}}>{ title }</h1>

                        <MoviesList keyWord={ keyWord }
                                    currentPage={ currentPage }
                                    getTotalResults={this.getTotalResults}/>

                        <PaginationBox currentPage={ currentPage }
                                       totalResults={ totalResults }
                                       pageSize={pageSize}
                                       changePage={this.changePage}
                                       loading={loading}/>
                    </Layout>
                </ErrorBoundry>
            </MovieDBServiceProvider>
        );
    }
}


