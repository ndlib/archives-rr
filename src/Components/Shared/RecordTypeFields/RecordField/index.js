import React from 'react'
// import Highlighter from 'react-highlight-words'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'

import './style.css'

const RecordField = ({
  label,
  field,
  recordType,
  className,
  // terms,
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
    <div className={`recordTypeField ${field} ${className}`}>
      <label htmlFor={field}>{label}</label>
      <div id={field}>
        <ReactMarkdown source={text} />
        {
          // Removing highlighting as markdown and/or html does not play well with it. If we want highlighting on this page we will have to do further investigation.
          // <Highlighter
          //   highlightClassName='term-match'
          //   searchWords={terms}
          //   autoEscape
          //   textToHighlight={text || ''}
          // />
        }
      </div>
    </div>
  )
}

export default RecordField
