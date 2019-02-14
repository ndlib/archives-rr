import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loading from 'Components/Shared/Loading'
import { recordTypesReady } from 'Store/storeReady'
import { searchTerms } from 'Functions/searchHelpers'
import RecordField from './RecordField'
import { displayFields } from 'Constants/fields'
import NotFound from 'Components/Shared/NotFound'
import './style.css'

const RecordType = (props) => {
  if (recordTypesReady(props)) {
    // get the first (and only) matching recordType from the store
    const recordType = props.contentReducer.recordTypes.find(s => {
      return s.sys.id === props.match.params.id
    })

    const terms = searchTerms(props)

    // render if it exists
    if (recordType) {
      return (
        <div className='recordTypeDisplay'>
          <h1>{recordType.fields.category.fields.name}</h1>
          <div className='recordTypeFields'>
            {
              displayFields.map(field => {
                return (
                  <RecordField
                    key={field}
                    label={getLabel(field)}
                    field={field}
                    recordType={recordType}
                    terms={terms}
                  />
                )
              })
            }
          </div>
        </div>
      )
    }

    // render message if not found
    return (
      <NotFound />
    )
  }
  return <Loading />
}

const getLabel = (field) => {
  if (field === 'scheduleId') {
    return 'Record Type Id'
  }
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => {
      return str.toUpperCase()
    })
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default withRouter(connect(mapStateToProps)(RecordType))
