// return true if there's a search query
export const hasSearch = (props) => {
  // has search params
  if (props.match && props.match.params && props.match.params.search) {
    // starts with query operator, but isn't ONLY query operator
    if(props.match.params.search.indexOf('q=') === 0 &&
     props.match.params.search !== 'q=') {
      return true
    }
  }
  return false
}

export const removeQueryOperator = (string) => {
  if(string) {
    return decodeURI(string.replace('q=', ''))
  }
  return ''
}

export const splitTerms = (searchString) => {
  // split terms on space in string, but keep terms inside double quotes as
  // a single term
  const myRegexp = /[^\s"]+|"([^"]*)"/gi
  let terms = []
  //Each call to exec returns the next regex match as an array
  let match
  do {
    match = myRegexp.exec(searchString)
    if (match != null) {
      //Index 1 in the array is the captured group if it exists
      //Index 0 is the matched text, which we use if no captured group exists
      const term = match[1] ? match[1] : match[0]
      terms.push(term.toLowerCase())
    }
  } while (match != null)
  return terms
}

export const searchTerms = (props) => {
  let terms = []
  if(hasSearch(props)) {
    const searchString = removeQueryOperator(props.match.params.search)
    terms = splitTerms(searchString)
  }
  return terms
}
