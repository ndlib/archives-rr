import React from 'react'
import '../style.css'

const DownloadAll = (props) => {
  return (
    <label className='printLabel' onClick={props.onClick}>
      <span role='img' aria-label=''>&#128190;</span>&nbsp;
      <span className='printButton'>Download All</span>
    </label>
  )
}

export default DownloadAll
