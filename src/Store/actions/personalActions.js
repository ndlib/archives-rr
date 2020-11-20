import OktaAuth from '@okta/okta-auth-js'

// Fall back to using the example file if it doesn't exist. This will allow
// the app to still run for development purposes without any additional setup (e.g. fetching the list from AWS)
let authorization
try {
  authorization = require('Constants/authorization')
} catch (e) {
  authorization = require('Constants/authorization.example.js')
}
const { fullAccessIds, fullAccessDepartments } = authorization

export const REQUEST_TOKEN = 'REQUEST_TOKEN'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const RECEIVE_NO_LOGIN = 'RECEIVE_NO_LOGIN'
export const RECEIVE_VALIDATION_ERROR = 'RECEIVE_VALIDATION_ERROR'
export const SET_VIEW = 'SET_VIEW'

export const NOT_FETCHED = 'API_STATUS_NOT_FETCHED'
export const FETCHING = 'API_STATUS_FETCHING'
export const SUCCESS = 'API_STATUS_SUCCESS'
export const ERROR = 'API_STATUS_ERROR'

export const oktaConfig = {
  url: 'https://okta.nd.edu',
  clientId: '0oa26m9h7s4JPRPFm357',
  redirectUri: `${window.location.origin}/`,
  issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
  ignoreSignature: true,
  tokenManager: {
    storage: 'sessionStorage',
    storageKey: 'archivesRetention',
  },
}

export const initLogin = () => {
  // console.log(oktaConfig.redirectUri)
  const authClient = new OktaAuth(oktaConfig)
  authClient.token.getWithRedirect({
    responseType: 'id_token',
    scopes: [
      'openid',
      'profile',
      'email',
      'netid',
      'directory',
    ],
  })
}
export const logOut = () => {
  // remove the jwt login information in session storage
  sessionStorage.removeItem('archivesRetention')
  // redirect to homepage since user likely on page requiring login
  window.location.replace('/')
}

export const requestToken = () => {
  return {
    type: REQUEST_TOKEN,
  }
}

export const receiveToken = (token, role) => {
  return {
    type: RECEIVE_TOKEN,
    token: token,
    role: role,
  }
}

export const receiveNoLogin = () => {
  return {
    type: RECEIVE_NO_LOGIN,
  }
}

export const recieveValidationFailure = (error) => {
  return {
    type: RECEIVE_VALIDATION_ERROR,
    error: error,
  }
}

export const setView = (view) => {
  return (dispatch) => dispatch({
    type: SET_VIEW,
    view: view,
  })
}

const handleToken = (dispatch, data) => {
  if (data.idToken) {
    let role = 'staff'
    if (fullAccessDepartments.includes(data.claims.primary_affiliation) || fullAccessIds.includes(data.claims.netid)) {
      role = 'admin'
    }
    dispatch(
      receiveToken(data.idToken, role),
    )
  } else {
    dispatch(
      receiveNoLogin(),
    )
  }
}

export const getToken = () => {
  const authClient = new OktaAuth(oktaConfig)
  return dispatch => {
    // start fetching dispatch
    dispatch(requestToken())
    try {
      authClient.tokenManager.get('idToken')
        .then(idToken => {
          if (idToken) {
            handleToken(dispatch, idToken)
            // If ID Token isn't found, try to parse it from the current URL
          } else if (window.location.hash) {
            authClient.token.parseFromUrl()
              .then(idToken => {
                // Store parsed token in Token Manager
                authClient.tokenManager.add('idToken', idToken)
                handleToken(dispatch, idToken)
              })
              .catch(error => console.error(error))
          } else {
            console.log('Could not get token from hash or storage')
            handleToken(dispatch, {})
          }
        })
    } catch (error) {
      dispatch(recieveValidationFailure(error.message))
    }
  }
}
