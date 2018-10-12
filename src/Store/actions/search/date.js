
const dateSearch = (terms, recordTypes, dateSearch, results) => {
  if (terms.length < 1) {
    // we haven't done a basic search and don't have any results to work with
    results = recordTypes.map(record => {
      return {
        id: record.sys.id,
        fieldsWithTerm: [],
        fieldCount: 0,
      }
    })
  }
  results.filter(result => {
    let record = recordTypes.filter(r => {
      return r.sys.id === result.id
    }
    ).shift()
    if (recordMeetsCriteria(record, dateSearch)) {
      updateResultWithDate(result, dateSearch)
      return true
    }
    return false
  })

  return results
}

const recordMeetsCriteria = (record, dateSearch) => {
  console.log('type', dateSearch.type)
  if (!dateSearch.type || dateSearch.type === 'null') {
    return false
  }
  return true
}

const updateResultWithDate = (result, dateSearch) => {
  result.hitCount += 1
  result.fieldsWithTerm.push('dateApprovedByGeneralCounsel')
  return result
}
export default dateSearch
