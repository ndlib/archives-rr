import React from 'react'
import { Link } from 'react-router-dom'
import Highligter from 'react-highlight-words'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './style.css'

const SearchResult = ({ result, recordTypes, ...props }) => {
  let searchWords = []
  if (props && props.searchReducer && props.searchReducer.terms) {
    searchWords = props.searchReducer.terms
  }
  const recordFromResult = recordTypes.find(
    record => {
      return record.sys.id === result.id
    }
  ) || { id: '', fieldsWithTerm: [], hitCount: 0 }
  return (
    <div className='result'>
      <Link to={`/recordType/${result.id}/${props.match.params.search}`}>
        <Highligter
          highlightClassName='term-match'
          searchWords={searchWords}
          autoEscape
          textToHighlight={recordFromResult.fields.recordType}
        />
      </Link>
      { result.fieldsWithTerm.map(field => {
        // don't repeat the recordType field because that's the "name"
        // don't display functional category because it's different
        if (field === 'recordType' || field === 'category') {
          return null
        }
        return (
          <div
            key={field}
            className='resultField'
          >
            <Highligter
              highlightClassName='term-match'
              searchWords={searchWords}
              autoEscape
              textToHighlight={recordFromResult.fields[field]}
            />
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default withRouter(connect(mapStateToProps)(SearchResult))
