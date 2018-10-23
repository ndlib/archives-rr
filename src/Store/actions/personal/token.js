import { viceroyAPI } from '../../../Constants/endpoints'
import * as statuses from '../../../Constants/apiStatuses'
import * as states from './constants'
import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
const loginUrl = viceroyAPI + '/token'

const handleToken = (dispatch, data) => {
  console.log('the beginning')
  if (data.redirect) {
    console.log('redirected')
    dispatch(
      states.recievePersonal(
        'login',
        statuses.SUCCESS,
        { redirectUrl: data.redirect }
      )
    )
    window.location = data.redirect
    return dispatch(
      states.recievePersonal(
        'login',
        statuses.SUCCESS,
        { token: data.jwt, redirectUrl: null }
      )
    )
  } else if (data.jwt) {
    console.log('jwt recieved')
    dispatch(
      states.recievePersonal(
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
    dispatch(states.requestPersonal('login', statuses.FETCHING))

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
        dispatch(states.recievePersonal('login', statuses.ERROR, e.message))
      })
  }
}

export default getToken
