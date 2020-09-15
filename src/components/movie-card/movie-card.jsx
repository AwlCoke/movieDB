import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Rate, Empty} from 'antd';
import './movie-card.css';
import Spinner from '../spinner';
import {formatDate} from '../hoc-helpers';


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

    shorten = (text, max) => {
        const substr = text.slice(0, max).split(' ').slice(0, -1);
        return text && text.length > max ? `${substr.join(' ')}...` : text
    }

    render() {

        const estimates = {
            low: '#E90000',
            middle: '#E97E00',
            high: '#E9D100',
            veryHigh: '#66E900'
        }

        const {description, posterUrl, title, votes, releaseDate, genres } = this.props;

        const {loading, userRate} = this.state;

        // genres.forEach((genre) => console.log(title, genre[idx]))

        let styled;

        if (votes < 3) {
            styled = `${estimates.low}`;
        } else if (votes < 5) {
            styled = `${estimates.middle}`;
        } else if (votes < 7) {
            styled = `${estimates.high}`;
        } else styled = `${estimates.veryHigh}`;

        const shorly = this.shorten(description, 150);

        const date = formatDate(releaseDate);

        const poster = posterUrl != null ? (<img className='poster'
                                         src={ posterUrl }
                                         alt={ `poster of ${title}` }/>)
                                         : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}style={{width:200}}/>);

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
                            genres={genres}
                            style={{color: styled, borderColor: styled}}
                            shape='circle'>{ votes }
                    </Button>

                    <div style={{marginTop:10, marginBottom: 10}}>{ date }</div>

                    <Button shape='round'>GENRE</Button>

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
