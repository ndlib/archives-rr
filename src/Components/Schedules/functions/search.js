// return true if there's a search query
const hasSearch = (props) => {
  if (props.match && props.match.params && props.match.params.search) {
    return true
  }
  return false
}

// do search actions on provided schedules
const searchResults = (schedules, props) => {
  if(hasSearch(props)) {
    console.log(`Searching with query: ${props.match.params.search}`)
    // TODO SEARCH WORK
  }

  return schedules
}

export default searchResults
