import {
  SUBMIT_SEARCH,
  RESULTS_READY,
  CLEAR_SEARCH,
  SETADANCEDSEARCH,
} from '../actions/searchActions'

export default(state = {}, action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return {
        ...state,
        advancedSearch: action.advancedSearch,
        terms: action.terms,
        searching: true,
        results: [],
      }
    case RESULTS_READY:
      return {
        ...state,
        searching: false,
        results: action.results,
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        advancedSearch: {},
        terms: [],
        searching: false,
        results: [],
      }
    case SETADANCEDSEARCH:
      return {
        ...state,
        advancedSearch: {
          ...state.advancedSearch,
          [action.field]: action.data,
        },
      }
    default:
      return state
  }
}
