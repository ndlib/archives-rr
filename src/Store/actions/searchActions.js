const searchableFields = [
  'recordType',
  'recordTypeId',
  'recordTypeDescription',
  'officialCopy',
  //'retention',
  //'triggerEvent',
  //'disposition',
  //'dispositionMethod',
  //'referenceCopy',
  //'referenceCopyDisposition',
  //'referenceCopyDispositionMethod',
  'storageRequirements',
  'legalReference',
  'notes',

  // restricted fields
  'systemOfRecord',
  'archivesNotes',
  'generalCounselNotes'
]

const dateFields = [
  'dateApprovedByGeneralCounsel',
  'dateRevised'
]

export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const RESULTS_READY = 'RESULTS_READY'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

export const submitSearch = (terms, recordTypes) => {
  return dispatch => {
    dispatch(startSearch(terms))

    let results = []
    terms.forEach(term => {
      recordTypes.forEach(recordType => {
        searchableFields.forEach(field => {
          if(recordType.fields[field] && recordType.fields[field].toLowerCase().indexOf(term) > -1) {
            let result = results.find((r) => {return r.id === recordType.sys.id})
            if(!result) {
              results.push({id: recordType.sys.id, fieldsWithTerm: [field]})
            } else {
              const i = results.findIndex(r => {return r.id === recordType.sys.id})
              results[i].fieldsWithTerm.push(field)
            }
          }
        })
      })
    })

    dispatch(returnResults(results))
  }
}

const startSearch = (terms) => {
  return {
    type: SUBMIT_SEARCH,
    terms: terms,
  }
}

const returnResults = (results) => {
  return {
    type: RESULTS_READY,
    results: results
  }
}

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  }
}
