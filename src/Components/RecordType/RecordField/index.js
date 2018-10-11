import React from 'react'
import Highlighter from 'react-highlight-words'
import moment from 'moment'

const RecordField = ({
  label,
  field,
  recordType,
  terms,
}) => {
  let text = recordType.fields[field]

  // if field name starts with date and the actual value is not empty
  if (field.indexOf('date') === 0 && recordType.fields[field]) {
    text = moment(recordType.fields[field]).format('MMMM D, YYYY')
  }

  return (
    <div className={field}>
      <h2>{label}</h2>
      <Highlighter
        highlightClassName='term-match'
        searchWords={terms}
        autoEscape
        textToHighlight={text}
      />
    </div>
  )
}

export default RecordField
