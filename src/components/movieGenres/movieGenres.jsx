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
                                genres.map(el => el.map (genre => {
                                    return genresList.forEach(arr => {
                                        if (arr[0] === genre) {
                                            // console.log(arr[1])
                                            return <span>{arr[1]}</span>
                                        }
                                        return ''
                                    })}))

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
