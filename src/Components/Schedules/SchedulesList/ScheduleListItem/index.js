import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './style.css'

const ScheduleListItem = ({schedule}) => {
  return (
    <div className='scheduleRow'>
      <Link to={`/schedule/${schedule.sys.id}`}>{schedule.fields.scheduleId}</Link>
    </div>
  )
}

ScheduleListItem.propTypes = {
  schedule: PropTypes.object.isRequired
}

export default ScheduleListItem
