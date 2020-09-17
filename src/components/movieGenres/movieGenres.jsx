import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { ContextConsumer } from '../context';
import Spinner from '../spinner';

const MovieGenres = ({ genres, loading }) => {
  return (
    <ContextConsumer>
      {(genresList) => {
        return genresList.length && !loading ? (
          <div>
            {genres.map((genre) => {
              return genresList.map((arr) => {
                if (arr[0] === genre) {
                  return (
                    <Button
                      key={genre}
                      size="small"
                      disabled
                      style={{ backgroundColor: 'inherit', color: 'inherit', marginRight: 5, marginBottom: 5 }}
                    >
                      {arr[1]}
                    </Button>
                  );
                }
                return null;
              });
            })}
          </div>
        ) : (
          <Spinner />
        );
      }}
    </ContextConsumer>
  );
};

MovieGenres.defaultProps = {
  genres: [],
  loading: true,
};

MovieGenres.propTypes = {
  genres: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
};

export default MovieGenres;
