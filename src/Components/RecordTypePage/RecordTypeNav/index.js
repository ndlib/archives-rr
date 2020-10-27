import React from 'react'
import { Link } from 'react-router-dom'
import DownloadAll from './DownloadAll'
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

  const queryString = props.location.search || ''
  return (
    <nav className='no-print' data-html2canvas-ignore>
      {prevRecord && (
        <Link to={`/recordType/${prevRecord.sys.id}${queryString}`} className='prevButton'>
          <span className='prevArrow'>{'\u25C0'}</span>Previous
        </Link>
      )}
      {nextRecord && (
        <Link to={`/recordType/${nextRecord.sys.id}${queryString}`} className='nextButton'>
          Next<span className='nextArrow'>{'\u25B6'}</span>
        </Link>
      )}
      <label className='printLabel' onClick={() => props.print(false)}>
        <span role='img' aria-label=''>&#128190;</span>&nbsp;
        <span className='printButton'>Download</span>
      </label>
      {(prevRecord || nextRecord) && (
        <DownloadAll onClick={() => props.print(true)} />
      )}
    </nav>
  )
}

export default RecordTypeNav
