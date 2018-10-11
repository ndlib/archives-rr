import React from 'react'
import './style.css'

const Loading = () => {
  return (
    <div className='sk-three-bounce'>
      <div className='sk-child sk-bounce1' />
      <div className='sk-child sk-bounce2' />
      <div className='sk-child sk-bounce3' />
    </div>
  )
}

export default Loading
