import React, {Component} from 'react';
import './app.css';
import { Layout } from 'antd';
import MoviesList from '../movies-list';
import Header from '../header';
import PaginationBox from '../pagination-box';
import ErrorBoundry from '../error-boundry';
import MovieDbService from '../../services/movie-db-service';
import {MovieDBServiceProvider} from "../context";

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

        return (
            <MovieDBServiceProvider value={ [ genresList, service ] }>
                <ErrorBoundry>
                    <Layout>
                        <Header onSearch={this.onSearch}/>
                    </Layout>
                    <Layout>
                        <div className='site-card-wrapper'>
                            <MoviesList keyWord={keyWord}/>
                        </div>
                        <div className='pagination-box-wrapper'>
                            <PaginationBox />
                        </div>
                    </Layout>
                </ErrorBoundry>
            </MovieDBServiceProvider>
        );
    }
}


