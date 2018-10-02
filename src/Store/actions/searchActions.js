export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const RESULTS_READY = 'RESULTS_READY'

export const submitSearch = (terms) => {
  return {
    type: SUBMIT_SEARCH,
    terms: terms,
  }
}

export const returnResults = (results) => {
  return {
    type: RESULTS_READY,
    results: results
  }
}
