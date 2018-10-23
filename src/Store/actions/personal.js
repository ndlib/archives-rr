import fetch from 'isomorphic-fetch'
import { viceroyAPI } from 'Constants/endpoints'
import * as statuses from 'Constants/apiStatuses'

const loginUrl = viceroyAPI + '/token'

export const RECEIVE_PERSONAL = 'RECEIVE_PERSONAL'
export const CLEAR_PERSONAL = 'CLEAR_PERSONAL'
export const REQUEST_PERSONAL = 'REQUEST_PERSONAL'

export const recievePersonal = (requestType, state, info) => {
  return {
    type: RECEIVE_PERSONAL,
    requestType: requestType,
    payload : info,
    state: state,
  }
}

export const clearPersonalInfo = () => {
  return {
    type: CLEAR_PERSONAL,
  }
}

// keep track of what do and don't have an active request or for.
export const requestPersonal = (requestType = '') => {
  return {
    type: REQUEST_PERSONAL,
    requestType: requestType,
  }
}

export const startRequest = (url, dispatch, success, token, err) => {
  return fetch(url, {
    headers: {
      'Authorization': token,
    },
  }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(json => success(dispatch, json))
    .catch(e => {
      err(e)
    })
}

const handleToken = (dispatch, data) => {
  console.log('the beginning')
  if (data.redirect) {
    console.log('redirected')
    dispatch(
      recievePersonal(
        'login',
        statuses.SUCCESS,
        { redirectUrl: data.redirect }
      )
    )
    window.location = data.redirect
    return dispatch(
      recievePersonal(
        'login',
        statuses.SUCCESS,
        { token: data.jwt, redirectUrl: null }
      )
    )
  } else if (data.jwt) {
    console.log('jwt recieved')
    dispatch(
      recievePersonal(
        'login',
        statuses.SUCCESS,
        { token: data.jwt, redirectUrl: null }
      )
    )
    console.log('JWT' + data.jwt)
  }
}

const getToken = () => {
  console.log('in getToken starting dispatch')
  return dispatch => {
    dispatch(requestPersonal('login', statuses.FETCHING))

    return fetch(loginUrl, {
      credentials: 'include',
    }).then(response => {
      console.log('getToken inside second fetch')
      if (response.status >= 200 && response.status < 400) {
        console.log('getToken 200 returned')
        return response.json()
      } else {
        console.log('getToken error thrown')
        throw new Error(response.statusText)
      }
    })
      .then(json => handleToken(dispatch, json))
      .catch(e => {
        dispatch(recievePersonal('login', statuses.ERROR, e.message))
      })
  }
}

export default getToken
