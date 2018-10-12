import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const DateField = ({ label, selectedDate, onChange }) => {
  return (
    <span className='dateField'>
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        isClearable
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        maxDate={moment().add(1, 'years')}
      />
    </span>
  )
}

export default DateField
