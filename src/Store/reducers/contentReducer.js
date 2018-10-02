// include the action types we care about
import {
  RECEIVE_CATEGORYS,
  RECEIVE_SCHEDULES,
  RECEIVE_PAGES
} from  '../actions/contentActions'

// populate the store based on they type of content received in the action
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORYS:
      return {
        ...state,
        categories: action.payload
      }
    case RECEIVE_SCHEDULES:
      return {
        ...state,
        schedules: action.payload
      }
    case RECEIVE_PAGES:
      return {
        ...state,
        pages: action.payload
      }
    default:
      return state
  }
}
