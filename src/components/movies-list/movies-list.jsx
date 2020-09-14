import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "antd";
import MovieDbService from '../../services/movie-db-service';
import './movies-list.css';
import MovieCard from "../movie-card";
import Spinner from "../spinner";
import ErrorBoundry from "../error-boundry";

export default class MoviesList extends Component {
    static defaultProps = {
        keyWord: '',
    };

    static propTypes = {
        keyWord: PropTypes.string,
    };

    movieDBService = new MovieDbService();

    state = {
        moviesList: null,
    }

    componentDidMount() {
        this.updateList();
    }

    componentDidUpdate(prevProps) {
        const {keyWord} = this.props
        if (keyWord !== prevProps.keyWord) {
            this.updateList();
        }
    }

    updateList () {
        const {keyWord} = this.props;
        this.movieDBService
            .getMovies(keyWord)
            .then(moviesList => {
                this.setState({ moviesList })
            });

    }


    renderMovies(arr) {

        return arr.map(({id, ...props}) => {
            return (
                <Col key={ id } flex='left'>
                    <MovieCard {...props}/>
                </Col>

            )
        })
    }

    render() {

        const { moviesList } = this.state;
        if (!moviesList) return <Spinner/>

        const movies = this.renderMovies(moviesList);
        return (
            <ErrorBoundry>
                <Row gutter={[32, 32]} justify='center'>
                    {movies}
                </Row>
            </ErrorBoundry>
        )

    }

}
