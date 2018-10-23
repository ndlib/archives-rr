import {
  RECEIVE_PERSONAL,
  CLEAR_PERSONAL,
  REQUEST_PERSONAL,
} from '../actions/personal'

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PERSONAL:
      return {
        ...state,
        status: 'FETCHING',
      }
    case RECEIVE_PERSONAL:
      // console.log(action)
      return {
        ...state,

      }
    case CLEAR_PERSONAL:
      return {
        ...state,
      }
    default: return state
  }
}
