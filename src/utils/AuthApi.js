import { configMainApi } from './constants';

class AuthApi {
  constructor({ configMainApi }) {
    this._baseUrl = configMainApi.baseUrl;
    this._headers = configMainApi.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : res.json().then(res => Promise.reject(res))
  }

  _request(url, options ) {
    return fetch(url, options).then(this._checkResponse)
  }

  signUp({email, password, name}) {
    return this._request(this._baseUrl + '/signup', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    })
  }

  signIn({email, password}) {
    return this._request(this._baseUrl + '/signin', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  signOut() {
    return this._request(this._baseUrl + '/signout', {
      method: 'POST',
      credentials: 'include'
    })
  }
}

const authApi = new AuthApi({ configMainApi })

export default authApi;
