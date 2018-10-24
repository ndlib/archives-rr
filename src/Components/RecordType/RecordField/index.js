import React from 'react'
import Highlighter from 'react-highlight-words'
import moment from 'moment'

import './style.css'

const RecordField = ({
  label,
  field,
  recordType,
  terms,
}) => {
  let text = recordType.fields[field]

  // if field name starts with date and the actual value is not empty
  if (field.indexOf('date') === 0 &&
   recordType.fields[field] &&
   moment(recordType.fields[field]).isValid()
  ) {
    text = moment(recordType.fields[field]).format('MMMM D, YYYY')
  }

  return (
    <div className={`recordTypeField ${field}`}>
      <label htmlFor={field}>{label}</label>
      <div id={field}>
        <Highlighter
          highlightClassName='term-match'
          searchWords={terms}
          autoEscape
          textToHighlight={text || ''}

        />
      </div>
    </div>
  )
}

export default RecordField
