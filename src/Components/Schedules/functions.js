// helper functions for filtering

// return true if there's a search query
export const isFiltered = (props) => {
  if (props.match && props.match.params && props.match.params.office) {
    return true
  }
  return false
}

// if there is an office id in the url find it in the store and return interval
export const findOffice = (props) => {
  let office
  // check if there is an office id in the url
  if(isFiltered(props)) {
    // find office with matching id from url
    office = props.contentReducer.offices.filter(
      o => {
        return o.sys.id === props.match.params.office
      }
    ).shift()
  }
  return office
}

// filter schedules by office or return them all if no office
export const filterSchedules = (props, office) => {
  let schedules = props.contentReducer.schedules
  if(office) {
    schedules = schedules.filter(
      schedule => {
        return schedule.fields.office.sys.id === props.match.params.office
      }
    )
  }
  return schedules
}

// return true if there's a search query
export const hasSearch = (props) => {
  if (props.match && props.match.params && props.match.params.search) {
    return true
  }
  return false
}

// do search actions on provided schedules
export const searchMatches = (schedules, query) => {
  console.log(`Searching with query: ${query}`)
  // TODO SEARCH WORK

  return schedules
}
