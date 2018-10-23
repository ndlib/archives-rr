const advancedSearchResults = (results, recordTypes, advancedSearch) => {
  // Get all the advanced searches as a list except dateSearch since that
  // is handled separately
  const searchFields = []
  Object.keys(advancedSearch).forEach(key => {
    if (key !== 'dateSearch') {
      searchFields.push(key)
    }
  })

  // check each result for ALL of the search fields in advanced search
  searchFields.forEach(field => {
    results = results.filter(result => {
      const record = recordTypes.find(record => {
        return record.sys.id === result.id
      })
      // category is special because it is a Link field in Contentful
      if (field === 'category') {
        if (record.fields[field] && record.fields[field].sys.id === advancedSearch[field]) {
          result.hitCount += 1
          result.fieldsWithTerm.push(field)
          return true
        }
      } else {
        if (record.fields[field] && record.fields[field] === advancedSearch[field]) {
          result.hitCount += 1
          result.fieldsWithTerm.push(field)
          return true
        }
      }

      return false
    })
  })
  return results
}
export default advancedSearchResults
