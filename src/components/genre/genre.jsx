import React from "react";
import {Button} from "antd";
import {MovieDBServiceConsumer} from "../context";

const Genre = ({genres}) => {
    return (
        <MovieDBServiceConsumer>
            {
                (genresList) => {
                    genres.forEach((genre, id) => {
                        if (genresList[genre[id]]) <Button>{genresList[genre[id]]}</Button>
                    })
                }
            }
        </MovieDBServiceConsumer>
    );
}

export default Genre;
