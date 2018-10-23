import fetch from 'isomorphic-fetch'
import { viceroyAPI } from 'Constants/endpoints'

const tokenUrl = viceroyAPI + '/token'

export const REQUEST_TOKEN = 'REQUEST_TOKEN'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const RECEIVE_REDIRECT = 'RECEIVE_REDIRECT'
export const RECEIVE_VALIDATION_ERROR = 'RECEIVE_VALIDATION_ERROR'

export const NOT_FETCHED = 'API_STATUS_NOT_FETCHED'
export const FETCHING = 'API_STATUS_FETCHING'
export const SUCCESS = 'API_STATUS_SUCCESS'
export const ERROR = 'API_STATUS_ERROR'

export const requestToken = () => {
  return {
    type: REQUEST_TOKEN,
  }
}

export const recieveToken = (token) => {
  return {
    type: RECEIVE_TOKEN,
    token: token,
  }
}

export const recieveRedirect = (redirect) => {
  return {
    type: RECEIVE_REDIRECT,
    redirect: redirect,
  }
}

export const recieveValidationFailure = (error) => {
  return {
    type: RECEIVE_VALIDATION_ERROR,
    error: error,
  }
}

const handleToken = (dispatch, data) => {
  if (data.redirect) {
    dispatch(
      recieveRedirect(data.redirect)
    )
    // window.location = data.redirect
    return dispatch(
      recieveToken(data.jwt)
    )
  } else if (data.jwt) {
    dispatch(
      recieveToken(data.jwt)
    )
    console.log('JWT' + data.jwt)
  }
}

export const getToken = () => {
  return dispatch => {
    // start fetching dispatch
    dispatch(requestToken())
    return fetch(tokenUrl, {
      credentials: 'include',
    }).then(response => {
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
        dispatch(recieveValidationFailure(e.message))
      })
  }
}
