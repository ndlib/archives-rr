import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// We only want to have a link if this recordType has schedules visible to the user
const RecordTypeLink = ({recordType, showEmpty, ...props}) => {

  // assume it has no schedules
  let hasSchedules = false

  // check that it has at least one schedule
   hasSchedules = props.contentReducer.schedules.some((schedule) => {
    return schedule.fields.recordType.fields.name === recordType.fields.name
  })

  if(hasSchedules) {
    return (
      <li key={recordType.sys.id}>
        <Link to={`/schedules-by-recordType/${recordType.sys.id}`}>{recordType.fields.name}</Link>
      </li>
    )
  } else if(showEmpty) {
    return (<li key={recordType.sys.id}>{recordType.fields.name}</li>)
  }
  return null
}

RecordTypeLink.propTypes = {
  recordType: PropTypes.object.isRequired,
  showEmpty: PropTypes.bool,
  contentReducer: PropTypes.object.isRequired,
}

RecordTypeLink.defaultProps = {
  showEmpty: false
}

export default RecordTypeLink
