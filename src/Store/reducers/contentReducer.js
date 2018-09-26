// include the action types we care about
import {
  RECEIVE_DIVISIONS,
  RECEIVE_OFFICES,
  RECEIVE_SCHEDULES
} from  '../actions/contentActions'

// populate the store based on they type of content received in the action
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DIVISIONS:
      return {
        divisions: action.payload,
        ...state
      }
    case RECEIVE_OFFICES:
      return {
        offices: action.payload,
        ...state
      }
    case RECEIVE_SCHEDULES:
      return {
        schedules: action.payload,
        ...state
      }
    default:
      return state
  }
}
