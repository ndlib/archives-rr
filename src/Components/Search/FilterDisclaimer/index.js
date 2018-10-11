import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './style.css'

const FilterDisclaimer = ({ isFiltered, category }) => {
  if (isFiltered && category) {
    // let user know results are filtered by category
    return (
      <div className='filteredBy'>Only showing record types for <span className='filter'>{category.fields.name}</span>. <Link to='/search'> (Show all record types)</Link></div>
    )
  } else if (isFiltered && !category) {
    // tried to filter, but invalid category - warn user
    return (
      <div className='filteredBy'><span className='filter'>Could not find a matching category, showing all available record types.</span></div>
    )
  } else {
    // no filtering means no message
    return null
  }
}

FilterDisclaimer.propTypes = {
  isFiltered: PropTypes.bool.isRequired,
  category: PropTypes.object,
}

export default FilterDisclaimer
