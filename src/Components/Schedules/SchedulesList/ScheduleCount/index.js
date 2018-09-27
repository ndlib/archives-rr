import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const ScheduleCount = ({schedules}) => {
  if(schedules) {
    return (
      <div className='scheduleCount'>Found <span className='number'>{schedules.length}</span> schedules.</div>
    )
  }
  return null
}

ScheduleCount.propTypes = {
  schedules: PropTypes.array.isRequired
}

export default ScheduleCount
