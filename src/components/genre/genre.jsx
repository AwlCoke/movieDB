import React from "react";
import {MovieDBServiceConsumer} from "../context";
import {Button} from "antd";

const Genre = ({genres}) => {
    return (
        <MovieDBServiceConsumer>
            {
                (genresList) => {

                }
            }
        </MovieDBServiceConsumer>
    );
}

export default Genre;
