const QUERYSEPARATOR = '&a='
const VALUESEPARATOR = '&v='
// return true if there's a search query
export const hasSearch = (props) => {
  // has search params
  if (props.match && props.match.params && props.match.params.search) {
    // starts with query operator, but isn't ONLY query operator
    if (props.match.params.search.indexOf('q=') === 0 &&
      (getQueryParam(props.match.params.search, 'q') !== 'q=' || getQueryParam(props.match.params.search, 'a'))) {
      return true
    }
  }
  return false
}

export const getRawQueryTerms = (string) => {
  if (string) {
    if (string.indexOf('&') > -1) {
      string = string.split('&').shift()
    }
    return decodeURI(string.replace('q=', ''))
  }
  return ''
}

export const getQueryParam = (string, key) => {
  if (string) {
    if (string.indexOf(`${key}=`) === -1) {
      return ''
    }

    string = string.split(`&${key}=`).pop()
    if (string.indexOf('&') > -1) {
      string = string.split('&').shift()
    }
    return decodeURI(string)
  }
  return ''
}

export const hasAdvancedSearch = (string) => {
  if (string && string.indexOf(QUERYSEPARATOR) > -1) {
    return true
  }
  return false
}

export const getAdvancedSearchFromUrl = (string) => {
  const advancedSearches = {}
  if (string) {
    const advancedFields = string.split(QUERYSEPARATOR)
    if (advancedFields.length > 1) {
      advancedFields.slice(1).forEach(advancedField => {
        const values = advancedField.split(VALUESEPARATOR)
        if (values[0] === 'dateSearch') {
          if (values.length === 4) {
            advancedSearches[values[0]] = {
              type: values[1],
              startDate: values[2],
              endDate: values[3],
            }
          }
        } else {
          if (values.length === 2) {
            advancedSearches[values[0]] = values[1]
          } else if (values.length > 2) {
            advancedSearches[values[0]] = [...values.splice(1)]
          }
        }
      })
    }
  }
  return advancedSearches
}

export const buildAdvancedSearchQuery = (advancedSearchObject) => {
  let string = ''
  Object.keys(advancedSearchObject).forEach(key => {
    if (key === 'dateSearch') {
      if ((advancedSearchObject[key].startDate || advancedSearchObject[key].endDate) && advancedSearchObject[key].type) {
        string += `${QUERYSEPARATOR}${key}`
        const values = advancedSearchObject[key]
        Object.keys(values).forEach(fieldKey => {
          string += `${VALUESEPARATOR}${values[fieldKey]}`
        })
      }
    } else {
      string += `${QUERYSEPARATOR}${key}`
      const valueArr = Array.isArray(advancedSearchObject[key]) ? advancedSearchObject[key] : [advancedSearchObject[key]]
      valueArr.forEach(value => {
        string += `${VALUESEPARATOR}${value}`
      })
    }
  })
  return string
}
export const splitTerms = (searchString) => {
  // split terms on space in string, but keep terms inside double quotes as
  // a single term
  const myRegexp = /[^\s"]+|"([^"]*)"/gi
  const terms = []
  // Each call to exec returns the next regex match as an array
  let match
  do {
    match = myRegexp.exec(searchString)
    if (match != null) {
      // Index 1 in the array is the captured group if it exists
      // Index 0 is the matched text, which we use if no captured group exists
      const term = match[1] ? match[1] : match[0]
      terms.push(term.toLowerCase())
    }
  } while (match != null)
  return terms
}

export const searchTerms = (props) => {
  let terms = []
  if (hasSearch(props)) {
    const searchString = getRawQueryTerms(props.match.params.search)
    terms = splitTerms(searchString)
  }
  return terms
}
