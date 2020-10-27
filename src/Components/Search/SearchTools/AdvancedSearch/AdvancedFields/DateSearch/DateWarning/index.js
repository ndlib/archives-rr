import React from 'react'

const DateWarning = ({ startDate, endDate, fields }) => {
  return (
    <>
      {
        (startDate || endDate) && !fields
          ? <div className='dateWarning'>*You must select a date field type to perform a date search.</div>
          : null
      }
      {
        (!startDate && !endDate) && fields
          ? <div className='dateWarning'>*You must specify at least a start or an end date.</div>
          : null
      }
    </>
  )
}

export default DateWarning
