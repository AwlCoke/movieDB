import React from "react";
import PropTypes from "prop-types";
import {Button} from "antd";
import {MovieDBServiceConsumer} from "../context";
import Spinner from "../spinner";

const MovieGenres = ({genres, loading}) => {

    return (
        <MovieDBServiceConsumer>
            {
                (genresList) => {
                    return (genresList.length && !loading) ?
                        (<div>
                            {
                                genres.map((genre, idx) => {
                                    return genresList.map(arr => {
                                        if (arr[0] === genre && idx < 4) {
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
