import React from 'react'

import ScheduleListItem from './ScheduleListItem'

const ScheduleList = ({schedules}) => {
    return (
      <React.Fragment>
        {
          // make the list
          schedules.map(
            schedule => {
              return (
                <ScheduleListItem
                  key={schedule.sys.id}
                  schedule={schedule}
                />
              )
            }
          )
        }
      </React.Fragment>
    )
}


export default ScheduleList
