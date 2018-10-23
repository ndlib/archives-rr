import {
  REQUEST_TOKEN,
  RECEIVE_TOKEN,
  RECEIVE_REDIRECT,
  RECEIVE_VALIDATION_ERROR,
  NOT_FETCHED,
  FETCHING,
  SUCCESS,
  ERROR,
} from '../actions/personalActions'

export default (state = { status: NOT_FETCHED, token: null, redirect: null, error: null }, action) => {
  switch (action.type) {
    case REQUEST_TOKEN:
      return {
        ...state,
        status: FETCHING,
        token: null,
      }
    case RECEIVE_TOKEN:
      return {
        ...state,
        status: SUCCESS,
        token: action.token,
      }
    case RECEIVE_REDIRECT:
      return {
        ...state,
        status: SUCCESS,
        redirect: action.redirect,
      }
    case RECEIVE_VALIDATION_ERROR:
      return {
        ...state,
        status: ERROR,
        error: action.error,
      }
    default:
      return state
  }
}
