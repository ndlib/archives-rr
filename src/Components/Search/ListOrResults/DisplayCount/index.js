import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const DisplayCount = ({count}) => {
  return (
    <div className='recordTypeCount'>Found <span className='number'>{count}</span> record types.</div>
  )
}

DisplayCount.propTypes = {
  count: PropTypes.number.isRequired
}

export default DisplayCount
