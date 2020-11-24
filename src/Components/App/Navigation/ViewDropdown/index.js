import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setView } from 'Store/actions/personalActions'
import './style.css'

const ViewDropdown = (props) => {
  // Only admins can change their view
  if (props.role !== 'admin') {
    return null
  }

  const onViewChange = (event) => {
    if (props.role === 'admin') {
      props.setView(event.target.value)
    }
  }

  return (
    <div className='viewAsDropdown'>
      <label>
        <span className='viewAsText'>View As:</span>
        <select onChange={onViewChange}>
          <option value='admin'>Admin</option>
          <option value='staff'>Staff</option>
        </select>
      </label>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { personalReducer } = state
  return {
    role: personalReducer.role,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setView }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDropdown)
