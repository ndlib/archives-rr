import basicSearchResults from './search/basic'
import dateSearchResults from './search/date'
import advancedSearchResults from './search/advanced'
import { applySearchResultsToContent } from './contentActions'

export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const RESULTS_READY = 'RESULTS_READY'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const SETADANCEDSEARCH = 'SETADANCEDSEARCH'
export const REMOVEADANCEDSEARCH = 'REMOVEADANCEDSEARCH'

export const submitSearch = (terms, termMode, fieldSearch, recordTypes, advancedSearch) => {
  return dispatch => {
    // dispatch message to store that we are starting the search
    dispatch(startSearch(terms, termMode, fieldSearch, advancedSearch))

    let results = basicSearchResults(terms, termMode, fieldSearch, recordTypes)
    if (advancedSearch) {
      // if we don't have any terms basic search gave us no results.
      // start with all records as potential results and filter
      if (terms.length < 1) {
        results = recordTypes.map(record => {
          return {
            id: record.sys.id,
            fieldsWithTerm: [],
            fieldCount: 0,
          }
        })
      }
      // date search is special because we're looking at 3 fields & values
      if (advancedSearch.dateSearch) {
        results = dateSearchResults(results, recordTypes, advancedSearch.dateSearch)
      }
      results = advancedSearchResults(results, recordTypes, advancedSearch)
    }

    // order results by most hits
    results.sort((r1, r2) => {
      return r2.hitCount - r1.hitCount
    })
    // Saves which record types have been hit so we can page through the results
    dispatch(applySearchResultsToContent(results))
    // dispatch message that we found results and are done searching
    dispatch(returnResults(results))
  }
}

const startSearch = (terms, termMode, fieldSearch, advancedSearch) => {
  return {
    type: SUBMIT_SEARCH,
    terms: terms,
    mode: termMode,
    field: fieldSearch,
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

export const removeAdvancedSearch = (field) => {
  return {
    type:REMOVEADANCEDSEARCH,
    field: field,
  }
}
