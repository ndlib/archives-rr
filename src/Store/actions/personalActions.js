import OktaAuth from '@okta/okta-auth-js'

export const REQUEST_TOKEN = 'REQUEST_TOKEN'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const RECEIVE_NO_LOGIN = 'RECEIVE_NO_LOGIN'
export const RECEIVE_VALIDATION_ERROR = 'RECEIVE_VALIDATION_ERROR'

export const NOT_FETCHED = 'API_STATUS_NOT_FETCHED'
export const FETCHING = 'API_STATUS_FETCHING'
export const SUCCESS = 'API_STATUS_SUCCESS'
export const ERROR = 'API_STATUS_ERROR'

export const oktaConfig = {
  url: 'https://okta.nd.edu',
  clientId: '0oa26m9h7s4JPRPFm357', // awaiting real clientId
  redirectUri: `${window.location.origin}/`,
  issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
  ignoreSignature: true,
  tokenManager: {
    storage: 'sessionStorage',
    storageKey: 'archivesRetention',
  },
}

export const initLogin = () => {
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

export const recieveToken = (token) => {
  return {
    type: RECEIVE_TOKEN,
    token: token,
  }
}

export const recieveNoLogin = () => {
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

const handleToken = (dispatch, data) => {
  if (data.idToken) {
    dispatch(
      recieveToken(data.idToken)
    )
  } else {
    dispatch(
      recieveNoLogin()
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
