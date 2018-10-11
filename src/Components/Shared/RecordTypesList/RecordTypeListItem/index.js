import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const RecordTypeListItem = ({ recordType }) => {
  return (
    <div className='recordTypeRow'>
      <Link to={`/recordType/${recordType.sys.id}`}
      >{recordType.fields.recordType}</Link>
    </div>
  )
}

RecordTypeListItem.propTypes = {
  recordType: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(RecordTypeListItem)
