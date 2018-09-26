import React from 'react'

const Schedule = ({match}) => {
  console.log(match)
  return (
    <div className='text-content'>Information about schedule {match.params.id}</div>
  )
}
export default Schedule
