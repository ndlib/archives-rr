import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loading from 'Components/Shared/Loading'
import { recordTypesReady } from 'Store/storeReady'
import { searchTerms } from 'Functions/searchHelpers'
import RecordField from './RecordField'
import RecordTypeNav from './RecordTypeNav'
import { displayFields, hideableFields } from 'Constants/fields'
import NotFound from 'Components/Shared/NotFound'
import './style.css'

const RecordType = (props) => {
  if (recordTypesReady(props)) {
    // get the first (and only) matching recordType from the store
    const recordType = props.contentReducer.recordTypes.find(s => {
      return s.sys.id === props.match.params.id
    })
    const terms = searchTerms(props)

    // render message if not found
    if (!recordType) {
      return (
        <NotFound />
      )
    }

    const hiddenFields = displayFields.filter(field => {
      return hideableFields.find(setting => setting.field === field) && !recordType.fields[field]
    })

    return (
      <div className='recordTypeDisplay'>
        <h1>
          {recordType.fields.category.fields.name}
          <RecordTypeNav currentId={props.match.params.id} recordTypes={props.contentReducer.recordTypes} />
        </h1>
        <div className='recordTypeFields'>
          {
            displayFields.map(field => {
              if (hiddenFields.includes(field)) {
                return null
              }

              return (
                <RecordField
                  key={field}
                  label={getLabel(field)}
                  field={field}
                  recordType={recordType}
                  terms={terms}
                  className={
                    hideableFields.filter(x => x.fillers && x.fillers.includes(field))
                      .find(y => hiddenFields.includes(y.field)) ? 'fillGap' : ''
                  }
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
