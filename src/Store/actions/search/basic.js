import { searchableFields } from 'Constants/fields'

const basicSearchResults = (terms, termMode, fieldSearch, recordTypes) => {
  let results = []
  // loop through all the searchable field type using each search term
  recordTypes.forEach(recordType => {
    const termsFound = []
    terms.forEach(term => {
      searchableFields
        .filter(field => !fieldSearch || fieldSearch === 'all' || field === fieldSearch)
        .forEach(field => {
          // check if the field exists and contains the search term
          if (recordType.fields[field] && recordType.fields[field].toLowerCase().indexOf(term) > -1) {
            if (!termsFound.includes(term)) {
              termsFound.push(term)
            }
            const result = results.find((r) => {
              return r.id === recordType.sys.id
            })
            // if we have a new result add sys.id, field name and set hits to 1
            if (!result) {
              results.push({
                id: recordType.sys.id,
                fieldsWithTerm: [field],
                hitCount: 1,
              })
            } else {
              // if the results exists check to see if we're already found this
              // field (with another term), add field if necessary
              const i = results.findIndex(
                r => {
                  return r.id === recordType.sys.id
                })
              if (results[i].fieldsWithTerm.indexOf(field) < 0) {
                results[i].fieldsWithTerm.push(field)
              }
              // increment the number of hits for this result, used for sorting
              results[i].hitCount += 1
            }
          }
        })
    })
    const searchResult = results.find(r => r.id === recordType.sys.id)
    if (searchResult && ['and', 'near'].includes(termMode.toLowerCase())) {
      // If the termMode is "and" or "near", we only want to include results that match all terms
      if (termsFound.length !== terms.length) {
        results = results.filter(r => r !== searchResult)
      }
      // For near search, use regex to make sure terms are within a limited distance from each other
      if (termMode.toLowerCase() === 'near') {
        let termsString = '('
        terms.forEach((term, index) => {
          if (index > 0) {
            termsString += '|'
          }
          termsString += term
        })
        termsString += ')'
        // Formula is basically: (any term) + up to 5 words + (any term), etc for however many terms there are.
        const regexString = termsString + ('\\w*?\\W+(?:\\w+\\W+){0,5}?\\w*?' + termsString).repeat(terms.length - 1)
        const rgx = new RegExp(regexString, 'gmi')

        searchResult.fieldsWithTerm = searchResult.fieldsWithTerm.filter(fieldName => {
          return rgx.test(recordType.fields[fieldName].toLowerCase())
        })
        if (!searchResult.fieldsWithTerm.length) {
          results = results.filter(r => r !== searchResult)
        }
      }
    }
  })
  return results
}

export default basicSearchResults
