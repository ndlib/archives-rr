import React from 'react'
import './style.css'
const SubmitSearch = ({ onSubmit, ...props }) => {
  return (
    <button
      className='submitSearch'
      onClick={(e) => {
        onSubmit()
      }}
    >Search</button>
  )
}

export default SubmitSearch
