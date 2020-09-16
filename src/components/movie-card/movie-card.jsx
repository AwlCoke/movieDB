import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Rate, Empty } from 'antd';
import './movie-card.css';
import Spinner from '../spinner';
import {formatDate, shorten} from '../hoc-helpers';
import MovieGenres from "../movieGenres";

export default class MovieCard extends Component {

    static defaultProps = {
        description: '',
        posterUrl: null,
        title: '',
        votes: 0,
        releaseDate: '',
        genres: []
    }

    static propTypes = {
        description: PropTypes.string,
        posterUrl: PropTypes.string,
        title: PropTypes.string,
        votes: PropTypes.number,
        releaseDate: PropTypes.string,
        genres: PropTypes.instanceOf(Array)
    }

    state = {
        userRate: 0,
        loading: true,
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {

        const estimates = {
            low: '#E90000',
            middle: '#E97E00',
            high: '#E9D100',
            veryHigh: '#66E900'
        }

        const { description, posterUrl, title, votes, releaseDate, genres } = this.props;

        const {loading, userRate} = this.state;

        let styled;

        if (votes < 3) {
            styled = `${estimates.low}`;
        } else if (votes < 5) {
            styled = `${estimates.middle}`;
        } else if (votes < 7) {
            styled = `${estimates.high}`;
        } else styled = `${estimates.veryHigh}`;

        const shorly = shorten(description, 120);

        const date = formatDate(releaseDate);

        const poster = posterUrl != null ? (<img className='poster'
                                                 src={ posterUrl }
                                                 alt={ `poster of ${title}` }/>)
                                         : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                   style={{width:200}}/>);

        const { Meta } = Card;

        if (loading) return <Spinner/>

        return(
            <>
                <Card loading={loading}
                      hoverable
                      bordered={false}
                      className='movieCard'
                      cover={poster}
                      bodyStyle={{width: 270}}>

                    <Meta title={ title } className='title'/>

                    <Button className='averageVote'
                            style={{color: styled, borderColor: styled}}
                            shape='circle'>{ votes }
                    </Button>

                    <div style={{marginTop:10, marginBottom: 10}}>{ date }</div>


                    <MovieGenres genres={genres}
                                 loading={loading}/>


                    <div style={{marginTop:10}}>{ shorly }</div>

                    <Rate allowHalf
                          allowClear
                          count='10'
                          value={ userRate }
                          defaultValue={ 0 }
                          className='stars'/>

                </Card>
            </>
        );
    }
}
