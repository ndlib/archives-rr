import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { schedulesReady } from '../../../Modules/storeReady'
// We only want to have a link if this office has schedules visible to the user
const OfficeLink = ({office, showEmpty, ...props}) => {

  // assume it has no schedules
  let hasSchedules = false

  // check that it has at least one schedule
  if(schedulesReady(props)) {
     hasSchedules = props.contentReducer.schedules.some((schedule) => {
      return schedule.fields.office.fields.name === office.fields.name
    })
  }

  if(hasSchedules) {
    return (
      <li key={office.sys.id}>
        <Link to={`/schedules-by-office/${office.sys.id}`}>{office.fields.name}</Link>
      </li>
    )
  }
  if(showEmpty) {
    return (<li key={office.sys.id}>{office.fields.name}</li>)
  }
  return null
}

OfficeLink.propTypes = {
  office: PropTypes.object.isRequired
}

OfficeLink.defaultProps = {
  showEmpty: false
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(OfficeLink)
