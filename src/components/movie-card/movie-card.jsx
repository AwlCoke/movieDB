import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Rate, Empty} from 'antd';
import { format } from 'date-fns';
import './movie-card.css';
import Spinner from "../spinner";


export default class MovieCard extends Component {

    static defaultProps = {
        description: '',
        posterUrl: '',
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

    shorten = (text, max) => {
        const substr = text.slice(0, max).split(' ').slice(0, -1);
        return text && text.length > max ? `${substr.join(' ')}...` : text
    }

    render() {

        const {description, posterUrl, title, votes, releaseDate, genres } = this.props;

        const {loading, userRate} = this.state;

        // console.log(genres);

        const shorly = this.shorten(description, 150);

        const date = format(new Date(releaseDate), 'do MMMM yyyy');

        const poster = posterUrl ? (<img className='poster'
                                             src={ posterUrl }
                                             alt={ `poster of ${title}` }/>
                                   ) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);

        const { Meta } = Card;

        if (loading) return <Spinner/>


        return(
            <>
                <Card hoverable
                      bordered={false}
                      className='movieCard'
                      cover={poster}
                      bodyStyle={{width: 270}}>

                    <Meta title={ title } className='title'/>

                    <Button className='averageVote'
                            danger
                            shape='circle'>{ votes }
                    </Button>

                    <div style={{marginTop:10, marginBottom: 10}}>{ date }</div>

                    <Button shape='round'
                            disabled>
                        GENRE
                    </Button>

                    <div style={{marginTop:10}}>{ shorly }</div>

                    <Rate allowHalf
                          allowClear
                          count='10'
                          defaultValue={ userRate }
                          className='stars'/>

                </Card>

            </>
        );
    }
}
