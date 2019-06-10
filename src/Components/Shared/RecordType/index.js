import React from 'react'
import { searchTerms } from 'Functions/searchHelpers'
import RecordField from './RecordField'
import { displayFields, hideableFields } from 'Constants/fields'
import NotFound from 'Components/Shared/NotFound'

import './style.css'

const RecordType = (props) => {
  const terms = searchTerms(props)

  // render message if not found
  if (!props.recordType) {
    return (
      <NotFound />
    )
  }

  const hiddenFields = displayFields.filter(field => {
    return hideableFields.find(setting => setting.field === field) && !props.recordType.fields[field]
  })

  return (
    <div className='recordType' id={props.recordType.sys.id}>
      <h1>{props.recordType.fields.category.fields.name}</h1>
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
                recordType={props.recordType}
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

const getLabel = (field) => {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => {
      return str.toUpperCase()
    })
}

export default RecordType