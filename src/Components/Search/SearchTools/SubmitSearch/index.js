import React from 'react'
import './style.css'
const SubmitSearch = ({ onSubmit }) => {
  return (
    <button
      className='submitSearch'
      onClick={onSubmit}
    >Search</button>
  )
}

export default SubmitSearch
