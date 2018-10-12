import basicSearch from './search/basic'
import dateSearch from './search/date'

export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const RESULTS_READY = 'RESULTS_READY'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const SETADANCEDSEARCH = 'SETADANCEDSEARCH'

export const submitSearch = (terms, recordTypes, advancedSearch) => {
  return dispatch => {
    // dispatch message to store that we are starting the search
    dispatch(startSearch(terms, advancedSearch))

    let results = basicSearch(terms, recordTypes)
    if (advancedSearch && advancedSearch.dateSearch) {
      results = dateSearch(terms, recordTypes, advancedSearch.dateSearch, results)
    }

    // dispatch message that we found results and are done searching
    dispatch(returnResults(results))
  }
}

const startSearch = (terms, advancedSearch) => {
  return {
    type: SUBMIT_SEARCH,
    terms: terms,
    advancedSearch: advancedSearch,
  }
}

const returnResults = (results) => {
  return {
    type: RESULTS_READY,
    results: results,
  }
}

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
  }
}

export const setAdvancedSearch = (field, data) => {
  return {
    type: SETADANCEDSEARCH,
    field: field,
    data: data,
  }
}
