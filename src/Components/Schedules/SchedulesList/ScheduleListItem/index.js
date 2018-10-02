import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Highligter from 'react-highlight-words'
import { connect } from 'react-redux'

import './style.css'

const ScheduleListItem = ({schedule, ...props}) => {
  let searchWords = []
  if(props && props.searchReducer && props.searchReducer.terms) {
    searchWords = props.searchReducer.terms
  }
  return (
    <div className='scheduleRow'>
      <Link to={`/schedule/${schedule.sys.id}`}
      ><Highligter
        highlightClassName="wordMatch"
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight={schedule.fields.scheduleId}
      /></Link>
    </div>
  )
}

ScheduleListItem.propTypes = {
  schedule: PropTypes.object.isRequired
}

const mapStateToProps = (state) => { return { ...state } }
export default connect(mapStateToProps)(ScheduleListItem)
