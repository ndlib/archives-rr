import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const RecordTypeNav = (props) => {
  let prevRecord, nextRecord

  const recordIndex = props.recordTypes.findIndex(s => {
    return s.sys.id === props.currentId
  })
  if (recordIndex >= 0) {
    prevRecord = props.recordTypes[recordIndex - 1]
    nextRecord = props.recordTypes[recordIndex + 1]
  }

  return (
    <nav className='no-print' data-html2canvas-ignore>
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
      <label className='printLabel' onClick={() => props.print(false)}>
        <span role='img' aria-label=''>&#128190;</span>
        <span className='printButton'>Save</span>
      </label>
      { (prevRecord || nextRecord) && (
        <label className='printLabel' onClick={() => props.print(true)}>
          <span role='img' aria-label=''>&#128190;</span>
          <span className='printButton'>Save All</span>
        </label>
      )}
    </nav>
  )
}

export default RecordTypeNav
