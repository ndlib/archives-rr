import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Loading from 'Components/Shared/Loading'
import { recordTypesReady } from 'Store/storeReady'
import { searchTerms } from 'Functions/searchHelpers'
import RecordField from './RecordField'
import { displayFields, hideableFields } from 'Constants/fields'
import NotFound from 'Components/Shared/NotFound'
import './style.css'

const RecordType = (props) => {
  if (recordTypesReady(props)) {
    let recordType, prevRecord, nextRecord

    // Get only the record types with search results OR that match the id specified
    const filteredResults = props.contentReducer.recordTypes.filter((rec) => {
      return rec.sys.id === props.match.params.id || rec.searchResults
    })
    // get the first (and only) matching recordType from the store
    const recordIndex = filteredResults.findIndex(s => {
      return s.sys.id === props.match.params.id
    })
    if (recordIndex >= 0) {
      recordType = filteredResults[recordIndex]
      prevRecord = filteredResults[recordIndex - 1]
      nextRecord = filteredResults[recordIndex + 1]
    }

    const terms = searchTerms(props)

    // render message if not found
    if (!recordType) {
      return (
        <NotFound />
      )
    }

    return (
      <div className='recordTypeDisplay'>
        <h1>
          {recordType.fields.category.fields.name}
          <nav>
            { prevRecord && (
              <Link to={`/recordType/${prevRecord.sys.id}`} className='prevButton'>
                <span className='prevArrow'>{`\u25C0`}</span>Previous
              </Link>
            )}
            { nextRecord && (
              <Link to={`/recordType/${nextRecord.sys.id}`} className='nextButton'>
                Next<span className='nextArrow'>{`\u25B6`}</span>
              </Link>
            )}
          </nav>
        </h1>
        <div className='recordTypeFields'>
          {
            displayFields.map(field => {
              if (hideableFields.includes(field) && !recordType.fields[field]) {
                return null
              }

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
  return <Loading />
}

const getLabel = (field) => {
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
