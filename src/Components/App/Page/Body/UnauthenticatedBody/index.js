import React from 'react'
import { viceroyAPI } from 'Constants/endpoints'
import './style.css'

const UnauthenticatedBody = () => {
  return (
    <div className='container-fluid'>
      <div className='mainContent'>
        <h1>Unauthenticated</h1>
        <div>Please log in to continue.</div>
        <a href={`${viceroyAPI}/login`}>
          <button className='loginButton'>Log in</button>
        </a>
      </div>

    </div>
  )
}

export default UnauthenticatedBody
