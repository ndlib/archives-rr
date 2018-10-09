import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loading from '../Loading'
import { recordTypesReady } from '../../Store/storeReady'
import { searchTerms } from '../../Functions/search'
import RecordField from './RecordField'

const RecordType = (props) => {
  if(recordTypesReady(props)) {
    // get the first (and only) matching recordType from the store
    const recordType = props.contentReducer.recordTypes.filter(s => {
      return s.sys.id === props.match.params.id
    }).shift()

    const terms = searchTerms(props)
    const fields = [
      'recordType',
      'recordTypeId',
      'recordTypeDescription',
      'officialCopy',
      'retention',
      'triggerEvent',
      'disposition',
      'dispositionMethod',
      'referenceCopy',
      'referenceCopyDisposition',
      'referenceCopyDispositionMethod',
      'storageRequirements',
      'legalReference',
      'notes',

      // restricted fields
      'systemOfRecord',
      'archivesNotes',
      'generalCounselNotes',

      // date fields
      'dateApprovedByGeneralCounsel',
      'dateRevised'
    ]

    // render if it exists
    if(recordType) {
      return (
        <React.Fragment>
          <h1>{recordType.fields.category.fields.name}</h1>
          {
            fields.map(field => {
              return (
                <RecordField
                  key={field}
                  label={
                    field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => { return str.toUpperCase() })
                  }
                  field={field}
                  recordType={recordType}
                  terms={terms}
                />
              )
            })
          }
        </React.Fragment>
      )
    }

    // render message if not found
    return (
      <React.Fragment>
        <div className='text-content'>No matching recordType was found.</div>
      </React.Fragment>
    )
  }
  return <Loading/>

}

const mapStateToProps = (state) => { return { ...state } }

export default withRouter(connect(mapStateToProps)(RecordType))
