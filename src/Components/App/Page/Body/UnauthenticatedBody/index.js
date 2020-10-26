import React from 'react'
import './style.css'
import { initLogin } from 'Store/actions/personalActions'

const UnauthenticatedBody = () => {
  return (
    <div className='container-fluid'>
      <div className='mainContent'>
        <h1>Unauthenticated</h1>
        <div>Please log in to continue.</div>
        <button
          className='loginButton'
          onClick={() => initLogin()}
        >Log in
        </button>
      </div>

    </div>
  )
}

export default UnauthenticatedBody
