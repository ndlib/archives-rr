// include the action types we care about
import {
  RECEIVE_CATEGORIES,
  RECEIVE_RECORDTYPES,
  RECEIVE_PAGES,
  RECEIVE_SEARCH_RESULTS,
} from '../actions/contentActions'

// populate the store based on they type of content received in the action
const reducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
    case RECEIVE_RECORDTYPES:
      return {
        ...state,
        recordTypes: action.payload,
      }
    case RECEIVE_PAGES:
      return {
        ...state,
        pages: action.payload,
      }
    case RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        recordTypes: state.recordTypes.map((currentRecord) => ({
          ...currentRecord,
          searchResults: action.payload.find((result) => {
            return result.id === currentRecord.sys.id
          }),
        })),
      }
    default:
      return state
  }
}

export default reducer
