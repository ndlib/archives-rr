import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Highligter from 'react-highlight-words'
import { connect } from 'react-redux'

import './style.css'

const RecordTypeListItem = ({recordType, ...props}) => {
  let searchWords = []
  if(props && props.searchReducer && props.searchReducer.terms) {
    searchWords = props.searchReducer.terms
  }
  return (
    <div className='recordTypeRow'>
      <Link to={`/recordType/${recordType.sys.id}`}
      ><Highligter
        highlightClassName="wordMatch"
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight={recordType.fields.recordType}
      /></Link>
    </div>
  )
}

RecordTypeListItem.propTypes = {
  recordType: PropTypes.object.isRequired
}

const mapStateToProps = (state) => { return { ...state } }
export default connect(mapStateToProps)(RecordTypeListItem)
