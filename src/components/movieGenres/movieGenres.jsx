import React from "react";
import PropTypes from "prop-types";
import {MovieDBServiceConsumer} from "../context";
import Spinner from "../spinner";
import {Button} from "antd";

const MovieGenres = ({genres, loading}) => {

    return (
        <MovieDBServiceConsumer>
            {
                (genresList) => {
                    return (genresList.length && !loading) ?
                        (<div>
                            {
                                genres.map(genre => {
                                    return genresList.map(arr => {
                                        if (arr[0] === genre) {
                                            return <Button key={genre}
                                                           shape="round"
                                                           style={{marginRight:5, marginBottom: 5}}>{arr[1]}</Button>
                                        }
                                        return null
                                    })})
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
