import React from 'react'
import { viceroyAPI } from 'Constants/endpoints'
import './style.css'

const UnauthorizedBody = () => {
  return (
    <div className='container-fluid'>
      <div className='mainContent'>
        <h1>Unauthorized</h1>
        <div>We were not able to verify your membership in the appropriate security groups at this time.</div>
        <a href={`${viceroyAPI}/logout`}>
          <button className='logoutButton'>Log out</button>
        </a>
      </div>

    </div>
  )
}

export default UnauthorizedBody
