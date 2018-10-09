import {
  searchableFields,
  //dateFields,
  //predefinedFields
} from '../../Constants/fields'

export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const RESULTS_READY = 'RESULTS_READY'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

export const submitSearch = (terms, recordTypes) => {
  return dispatch => {
    // dispatch message to store that we are starting the search
    dispatch(startSearch(terms))

    let results = []
    // loop through all the searchable field type using each search term
    recordTypes.forEach(recordType => {
      terms.forEach(term => {
        searchableFields.forEach(field => {
          // check if the field exists and contains the search term
          if(recordType.fields[field] && recordType.fields[field].toLowerCase().indexOf(term) > -1) {
            let result = results.find((r) => {return r.id === recordType.sys.id})
            // if we have a new result add sys.id, field name and set hits to 1
            if(!result) {
              results.push({
                id: recordType.sys.id,
                fieldsWithTerm: [field],
                hitCount: 1})
            } else {
              // if the results exists check to see if we're already found this
              // field (with another term), add field if necessary
              const i = results.findIndex(
                r => {
                  return r.id === recordType.sys.id
              })
              if(results[i].fieldsWithTerm.indexOf(field) < 0) {
                results[i].fieldsWithTerm.push(field)
              }
              // increment the number of hits for this result, used for sorting
              results[i].hitCount += 1
            }
          }
        })
      })
    })
    // order results by most hits
    results.sort((r1, r2) => {
      return r2.hitCount - r1.hitCount
    })

    // dispatch message that we found results and are done searching
    dispatch(returnResults(results))
  }
}

const startSearch = (terms) => {
  return {
    type: SUBMIT_SEARCH,
    terms: terms,
  }
}

const returnResults = (results) => {
  return {
    type: RESULTS_READY,
    results: results
  }
}

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  }
}
