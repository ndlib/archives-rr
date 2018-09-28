// include the action types we care about
import {
  RECEIVE_CATEGORYS,
  RECEIVE_RECORDTYPES,
  RECEIVE_SCHEDULES,
  RECEIVE_PAGES
} from  '../actions/contentActions'

// populate the store based on they type of content received in the action
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORYS:
      return {
        categories: action.payload,
        ...state
      }
    case RECEIVE_RECORDTYPES:
      return {
        recordTypes: action.payload,
        ...state
      }
    case RECEIVE_SCHEDULES:
      return {
        schedules: action.payload,
        ...state
      }
    case RECEIVE_PAGES:
      return {
        pages: action.payload,
        ...state
      }
    default:
      return state
  }
}
