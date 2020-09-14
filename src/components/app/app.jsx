import React, {Component} from 'react';
import './app.css';
import {Col, Layout, PageHeader, Row, Tabs} from 'antd';
import MoviesList from '../movies-list';
import Header from '../header';
import PaginationBox from '../pagination-box';
import ErrorBoundry from '../error-boundry';
import MovieDbService from '../../services/movie-db-service';
import {MovieDBServiceProvider} from "../context";

const { TabPane } = Tabs;

export default class App extends Component{

    state = {
        genresList: [],
        service: new MovieDbService,
        keyWord: ''
    }

    componentDidMount() {
        const genres = this.getGenres();
        genres.then(res => {
            this.setState({
                genresList: res,
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
            keyWord: value
        });
    }

    render() {

        const { genresList, service, keyWord } = this.state;

        const title = keyWord ? '' : 'Top Rated Movies'

        return (
            <MovieDBServiceProvider value={ [ genresList, service ] }>
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
                                <Header onSearch={this.onSearch}/>
                            </Col>
                        </Row>

                        <h1 style={{textAlign:'center', color:'darkgray'}}>{title}</h1>

                        <MoviesList keyWord={keyWord}/>

                        <PaginationBox />

                    </Layout>
                </ErrorBoundry>
            </MovieDBServiceProvider>
        );
    }
}


