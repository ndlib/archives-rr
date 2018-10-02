import {
  SUBMIT_SEARCH,
  RESULTS_READY
} from '../actions/searchActions'

export default(state = {}, action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return {
        ...state,
        terms: action.terms,
        searching: true,
        results: []
      }
    case RESULTS_READY:
      return {
        ...state,
        searching: false,
        results: action.results
      }
    default:
      return state
  }
}
