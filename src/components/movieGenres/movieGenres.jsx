import React from "react";
import PropTypes from "prop-types";
import {MovieDBServiceConsumer} from "../context";
import Spinner from "../spinner";

const MovieGenres = ({genres, loading}) => {

    return (
        <MovieDBServiceConsumer>
            {
                (genresList) => {
                    return (genresList.length && !loading) ? (
                        <div>
                            {
                                genres.map(el =>
                                    genresList.forEach(arr => {
                                        if (arr[0] === el) return <span>{arr[1]}</span>
                                        return <span>genre</span>
                                    }))
                            }
                        </div>)
                        : <Spinner/>
                }
            }
        </MovieDBServiceConsumer>
    )
}

MovieGenres.defaultProps = {
    genres: [],
    loading: true
}

MovieGenres.propTypes = {
    genres: PropTypes.instanceOf(Array),
    loading: PropTypes.bool,
}

export default MovieGenres;
