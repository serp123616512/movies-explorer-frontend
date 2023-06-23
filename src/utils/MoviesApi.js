import { configMoviesApi } from './constants';

class MoviesApi {
  constructor({ configApi }) {
    this._baseUrl = configApi.baseUrl + '/beatfilm-movies';
  }

  _checkResponse(res) {
    return res.ok ? res.json(): Promise.reject({ message: 'Произошла ошибка на сервере. Пожалуйста, повторите запрос позднее.'})
  }

  _request(url) {
    return fetch(url).then(this._checkResponse)
  }

  getMovies() {
    return this._request(this._baseUrl)
  }
}

const moviesApi = new MoviesApi({ configApi: configMoviesApi })

export default moviesApi;
