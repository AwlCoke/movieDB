export default class MovieDbService {
  apiBase = 'https://api.themoviedb.org';

  apiKey = '5c49318cf30b5f1de695245fd0a13af9';

  startGuestSession = async () => {
    try {
      let res = await fetch(`${this.apiBase}/3/authentication/guest_session/new?api_key=${this.apiKey}`);
      if (!res.ok) {
        throw new Error();
      }
      res = await res.json();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  getResource = async (url, pageNumber) => {
    try {
      let res = await fetch(`${this.apiBase}/3/search/movie?api_key=${this.apiKey}&query=${url}&page=${pageNumber}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
      res = await res.json();
      return res;
    } catch (error) {
      throw new Error('ERROR IS ', error);
    }
  };

  getAllGenres = async () => {
    try {
      let res = await fetch(`${this.apiBase}/3/genre/movie/list?api_key=${this.apiKey}`);
      if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
      }
      res = await res.json();
      return res.genres.map(this.transformGenres);
    } catch (error) {
      throw new Error(error);
    }
  };

  getTopRatedMovies = async (pageNumber) => {
    try {
      let res = await fetch(`${this.apiBase}/3/movie/top_rated?api_key=${this.apiKey}&page=${pageNumber}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${this.apiBase}, received ${res.status}`);
      }
      res = await res.json();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  getMovies = async (keyword, pageNumber, sessionId) => {
    try {
      const rated = await this.getRatedMovies(sessionId);
      let res;
      let totalResults;
      if (keyword) {
        res = await this.getResource(`/${keyword}/`, pageNumber);
        totalResults = res.total_results;
      } else {
        res = await this.getTopRatedMovies(pageNumber);
        totalResults = 200;
      }
      let movies = res.results.map(this.transformMovie);
      if (rated) {
        movies = this.checkRated(rated[1], movies);
      }
      return [totalResults, movies];
    } catch (error) {
      throw new Error(error);
    }
  };

  getRatedMovies = async (sessionID, pageNumber) => {
    try {
      const toPage = pageNumber ? `&page=${pageNumber}` : '';
      if (sessionID) {
        const url = `${this.apiBase}/3/guest_session/${sessionID}/rated/movies?api_key=${this.apiKey}${toPage}`;
        let res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Could not get rated movies`);
        }
        res = await res.json();
        return [res.total_results, res.results.map(this.transformMovie)];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  };

  checkRated = (ratedMovies, movies) => {
    const result = movies.map((movie) => {
      // eslint-disable-next-line guard-for-in
      for (const i in ratedMovies) {
        const rm = ratedMovies[i];
        if (rm.id === movie.id) {
          // eslint-disable-next-line no-param-reassign
          movie.rating = rm.rating;
        }
      }
      return movie;
    });
    return result;
  };

  rateMovie = async (movieID, sessionID, value) => {
    const url = `${this.apiBase}/3/movie/${movieID}/rating?api_key=${this.apiKey}&guest_session_id=${sessionID}`;
    try {
      return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new Error('ERROR IS ', error);
    }
  };

  transformMovie = (movie) => {
    const url = movie.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}` : null;
    const genres = movie.genre_ids;
    const rating = movie.rating ? movie.rating : null;
    return {
      id: movie.id,
      title: movie.title,
      posterUrl: url,
      description: movie.overview,
      votes: movie.vote_average,
      releaseDate: movie.release_date,
      genres,
      rating,
    };
  };

  transformGenres = (genre) => {
    return [genre.id, genre.name];
  };
}
