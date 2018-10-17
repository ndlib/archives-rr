import moment from 'moment'
const dateSearchResults = (results, recordTypes, dateSearch) => {
  // filter results
  results = results.filter(result => {
    // find the original record
    let record = recordTypes.find(r => {
      return r.sys.id === result.id
    })
    // try and update the record based on the dateSearch
    result = filterOnDateSearch(result, record, dateSearch)
    // the record has been updated if it includes one or both datefields now
    if (result.fieldsWithTerm.indexOf('dateApprovedByGeneralCounsel') > -1 ||
     result.fieldsWithTerm.indexOf('dateRevised') > -1) {
      return true
    }
    return false
  })

  return results
}

const filterOnDateSearch = (result, record, dateSearch) => {
  if (!dateSearch.type || dateSearch.type === 'null') {
    return result
  }
  let found
  switch (dateSearch.type) {
    case 'dateApprovedByGeneralCounsel':
      found = compareDates(record, dateSearch, 'dateApprovedByGeneralCounsel')
      if (found) {
        updateResult(result, 'dateApprovedByGeneralCounsel')
      }
      break
    case 'dateRevised':
      found = compareDates(record, dateSearch, 'dateRevised')
      if (found) {
        updateResult(result, 'dateRevised')
      }
      break
    case 'dateApprovedByGeneralCounsel&&dateRevised':
      found = []
      found[0] = compareDates(record, dateSearch, 'dateApprovedByGeneralCounsel')
      found[1] = compareDates(record, dateSearch, 'dateRevised')
      // only update if found in both fields
      if (found[0] && found[1]) {
        updateResult(result, 'dateApprovedByGeneralCounsel')
        updateResult(result, 'dateRevised')
      }
      break
    case 'dateApprovedByGeneralCounsel||dateRevised':
      found = []
      found[0] = compareDates(record, dateSearch, 'dateApprovedByGeneralCounsel')
      found[1] = compareDates(record, dateSearch, 'dateRevised')
      // update if found in either or both fields
      if (found[0]) {
        updateResult(result, 'dateApprovedByGeneralCounsel')
      }
      if (found[1]) {
        updateResult(result, 'dateRevised')
      }
      break
    default:
      break
  }
  return result
}

const compareDates = (record, dateSearch, field) => {
  // set sensible default for null values of start and end date
  let startDate = dateSearch.startDate
  let endDate = dateSearch.endDate
  if (!moment(startDate, 'YYYY-MM-DD').isValid()) {
    startDate = '1842-01-01'
  }
  if (!moment(endDate, 'YYYY-MM-DD').isValid()) {
    endDate = moment().format('YYYY-MM-DD')
  }

  // check if date is in range
  if (record.fields[field] >= startDate &&
    record.fields[field] <= endDate) {
    return true
  }
  return false
}

const updateResult = (result, field) => {
  result.hitCount += 1
  result.fieldsWithTerm.push(field)
  return result
}
export default dateSearchResults
