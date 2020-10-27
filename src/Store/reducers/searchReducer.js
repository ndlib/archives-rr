import {
  SUBMIT_SEARCH,
  RESULTS_READY,
  CLEAR_SEARCH,
  SETADANCEDSEARCH,
  REMOVEADANCEDSEARCH,
} from '../actions/searchActions'

const reducer = (state = {}, action) => {
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
    case REMOVEADANCEDSEARCH: {
      const { advancedSearch } = state
      delete advancedSearch[action.field]
      return {
        ...state,
        advancedSearch: advancedSearch,
      }
    }
    default:
      return state
  }
}

export default reducer
