import { configMainApi } from './constants';

class UserApi {
  constructor({ configApi }) {
    this._baseUrl = configApi.baseUrl + '/users/me';
    this._headers = configApi.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : res.json().then(res => Promise.reject(res))
  }

  _request(url, options ) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUser() {
    return this._request(this._baseUrl, {
      headers: this._headers,
      credentials: 'include',
    })
  }

  patchUser({ name, email }) {
    return this._request(this._baseUrl, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
  }
}

const userApi = new UserApi({ configApi: configMainApi })

export default userApi;
