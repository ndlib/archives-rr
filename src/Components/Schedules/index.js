import React from 'react'

import ScheduleList from './SchedulesList'

const Schedules = (props) => {
  return (
    <React.Fragment>
      <div className='text-content'>An alphabetical listing of all schedules with search and filter functionality. Clicking an individual schedule will go to a page for only that schedule.</div>
      <ScheduleList/>
    </React.Fragment>
  )
}

export default Schedules
