// helper functions for filtering

// return true if there's a search query
export const isFiltered = (props) => {
  if (props.match && props.match.params && props.match.params.category) {
    return true
  }
  return false
}

// if there is an category id in the url find it in the store and return interval
export const findCategory = (props) => {
  let category
  // check if there is an category id in the url
  if (isFiltered(props)) {
    // find category with matching id from url
    category = props.contentReducer.categories.filter(
      c => {
        return c.sys.id === props.match.params.category
      }
    ).shift()
  }
  return category
}

// filter recordTypes by category or return them all if no category
export const filterRecordsByCategory = (props, category) => {
  let recordTypes = props.contentReducer.recordTypes
  if (category) {
    recordTypes = recordTypes.filter(
      recordType => {
        return recordType.fields.category.sys.id === category.sys.id
      }
    )
  }
  return recordTypes
}