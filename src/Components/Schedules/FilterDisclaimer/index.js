import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './style.css'

const FilterDisclaimer = ({isFiltered, recordType}) => {
  if(isFiltered && recordType) {
    // let user know results are filtered by recordType
    return (
      <div className='filteredBy'>Only showing schedules for <span className='filter'>{recordType.fields.name}</span>. <Link to='/schedules'> (Show all schedules)</Link></div>
    )
  } else if (isFiltered && !recordType){
    // tried to filter, but invalid recordType - warn user
    return (
      <div className='filteredBy'><span className='filter'>Could not find a matching recordType, showing all available schedules.</span></div>
    )
  } else {
    // no filtering means no message
    return null
  }
}

FilterDisclaimer.propTypes = {
  isFiltered: PropTypes.bool.isRequired,
  recordType: PropTypes.object
}

export default FilterDisclaimer
