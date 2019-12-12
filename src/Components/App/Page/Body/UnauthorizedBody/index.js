import React from 'react'
import { logOut } from 'Store/actions/personalActions'
import './style.css'

const UnauthorizedBody = () => {
  return (
    <div className='container-fluid'>
      <div className='mainContent'>
        <h1>Unauthorized</h1>
        <div>We were not able to verify your membership in the appropriate security groups at this time.</div>
        <button
          className='logoutButton'
          onClick={() => logOut()}
        >Log out</button>
      </div>

    </div>
  )
}

export default UnauthorizedBody
