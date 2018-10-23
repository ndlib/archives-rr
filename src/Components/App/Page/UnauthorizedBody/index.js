import React from 'react'
import { connect } from 'react-redux'
import getToken from 'Store/actions/personal'

const UnauthorizedBody = (props) => {
  return (
    <div className='container-fluid'>
      <div className='mainContent'>
        <div>Unauthorized</div>
        <div>Please log in to continue</div>
        <button
          onClick={() => props.dispatch(getToken())}>Log in</button>
      </div>
    </div>

  )
}
const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(UnauthorizedBody)
