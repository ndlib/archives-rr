import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const RecordTypeCount = ({recordTypes}) => {
  if(recordTypes) {
    return (
      <div className='recordTypeCount'>Found <span className='number'>{recordTypes.length}</span> record types.</div>
    )
  }
  return null
}

RecordTypeCount.propTypes = {
  recordTypes: PropTypes.array.isRequired
}

export default RecordTypeCount
