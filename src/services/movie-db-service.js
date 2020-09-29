export default class MovieDbService {
  apiBase = 'https://api.themoviedb.org';

  apiKey = '5c49318cf30b5f1de695245fd0a13af9';

  startGuestSession = async () => {
    let res = await fetch(`${this.apiBase}/3/authentication/guest_session/new?api_key=${this.apiKey}`);
    if (!res.ok) {
      throw new Error();
    }
    res = await res.json();
    return res;
  };

  getResource = async (url, pageNumber) => {
    let res = await fetch(`${this.apiBase}/3/search/movie?api_key=${this.apiKey}&query=${url}&page=${pageNumber}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    res = await res.json();
    return res;
  };

  getAllGenres = async () => {
    let res = await fetch(`${this.apiBase}/3/genre/movie/list?api_key=${this.apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
    }
    res = await res.json();
    return res.genres.map(this.transformGenres);
  };

  getTopRatedMovies = async (pageNumber) => {
    let res = await fetch(`${this.apiBase}/3/movie/top_rated?api_key=${this.apiKey}&page=${pageNumber}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}, received ${res.status}`);
    }
    res = await res.json();
    return res;
  };

  getMovies = async (keyword, pageNumber) => {
    let res;
    if (keyword) {
      res = await this.getResource(`/${keyword}/`, pageNumber);
      return [res.total_results, res.results.map(this.transformMovie)];
    }
    res = await this.getTopRatedMovies(pageNumber);
    return [200, res.results.map(this.transformMovie)];
  };

  getRatedMovies = async (sessionID, pageNumber) => {
    const url = `${this.apiBase}/3/guest_session/${sessionID}/rated/movies?api_key=${this.apiKey}&page=${pageNumber}`;
    let res = await fetch(url);
    if (!res.ok) {
      console.log(res);
      throw new Error(`Could not get rated movies`);
    }
    res = await res.json();
    return [res.total_results, res.results.map(this.transformMovie)];
  };

  rateMovie = async (movieID, sessionID, value) => {
    const url = `${this.apiBase}/3/movie/${movieID}/rating?api_key=${this.apiKey}&guest_session_id=${sessionID}`;
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (!result.ok) return result.status_message;
      return result;
    } catch (error) {
      throw error;
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
