import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const RecordTypeNav = (props) => {
  let prevRecord, nextRecord

  // Get only the record types with search results OR that match the id of the current page
  const filteredResults = props.recordTypes.filter((rec) => {
    return rec.sys.id === props.currentId || rec.searchResults
  })
  const recordIndex = filteredResults.findIndex(s => {
    return s.sys.id === props.currentId
  })
  if (recordIndex >= 0) {
    prevRecord = filteredResults[recordIndex - 1]
    nextRecord = filteredResults[recordIndex + 1]
  }

  return (
    <nav className='no-print'>
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
  )
}

export default RecordTypeNav
