// helper functions for filtering

// return true if there's a search query
export const isFiltered = (props) => {
  if (props.match && props.match.params && props.match.params.recordType) {
    return true
  }
  return false
}

// if there is an recordType id in the url find it in the store and return interval
export const findRecordType = (props) => {
  let recordType
  // check if there is an recordType id in the url
  if(isFiltered(props)) {
    // find recordType with matching id from url
    recordType = props.contentReducer.recordTypes.filter(
      o => {
        return o.sys.id === props.match.params.recordType
      }
    ).shift()
  }
  return recordType
}

// filter schedules by recordType or return them all if no recordType
export const filterSchedules = (props, recordType) => {
  let schedules = props.contentReducer.schedules
  if(recordType) {
    schedules = schedules.filter(
      schedule => {
        return schedule.fields.recordType.sys.id === props.match.params.recordType
      }
    )
  }
  return schedules
}
