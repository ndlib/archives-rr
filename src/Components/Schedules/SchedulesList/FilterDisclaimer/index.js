import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './style.css'

const FilterDisclaimer = ({isFiltered, office}) => {
  if(isFiltered && office) {
    return (
      <div className='filteredBy'>Only showing schedules for <span className='filter'>{office.fields.name}</span>. <Link to='/schedules'> (Show all schedules)</Link></div>
    )
  } else if (isFiltered && !office){
    return (
      <div className='filteredBy'><span className='filter'>Could not find a matching office, showing all available schedules.</span></div>
    )
  } else {
    return null
  }
}

FilterDisclaimer.propTypes = {
  isFiltered: PropTypes.bool.isRequired,
  office: PropTypes.object
}

export default FilterDisclaimer
