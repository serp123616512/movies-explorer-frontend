import { configMainApi } from './constants';

class SavedMoviesApi {
  constructor({ configApi }) {
    this._baseUrl = configApi.baseUrl;
    this._headers = configApi.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : res.json().then(res => Promise.reject(res))
  }

  _request(url, options ) {
    return fetch(url, options).then(this._checkResponse)
  }

  getMovies() {
    return this._request(this._baseUrl + '/movies', {
      headers: this._headers,
      credentials: 'include',
    })
  }

  postMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    return this._request(this._baseUrl + '/movies', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      })
    })
  }

  deleteMovie(movieId) {
    return this._request(this._baseUrl + '/movies/' + movieId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
  }
}

const savedMoviesApi = new SavedMoviesApi({ configApi: configMainApi })

export default savedMoviesApi;
