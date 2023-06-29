import { hour, shortFilm, configMoviesApi } from './constants';

export const duration = (dur) => {
  if (dur < hour) return `${dur}м`;
  if (dur >= hour) {
    const hours = (Math.floor(dur/hour));
    const minutes = dur % hour;
    return `${hours}ч ${minutes}м`;
  }
  return false;
}

export const reformFilms = (moviesData) => {
  const movies = [];

  moviesData.forEach((movie) => {
    movies.push({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: configMoviesApi.baseUrl + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: configMoviesApi.baseUrl + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      liked: false,
    })
  })

  return movies;
}

export const filterFilms = ({ moviesBitfilms, savedMovies, movieValue, checked }) => {
  const filterMovies = [];

  movieValue = movieValue.toLowerCase().replace(/^\s+|\s+$|\s+(?=\s)/g, "");

  moviesBitfilms.forEach((movie) => {
    if (movie.nameRU.toLowerCase().includes(movieValue) && (checked ? movie.duration <= shortFilm : true)) {
      const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId);
      if (savedMovie) {
        movie.liked = savedMovie._id;
      }

      filterMovies.push(movie);
    }
  })

  return filterMovies;
}
