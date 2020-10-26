import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import DisplayCount from './DisplayCount'
import RecordTypeList from 'Components/Shared/RecordTypesList'
import SearchResultsList from './SearchResultsList'
import { allReady } from 'Store/storeReady'
import { hasSearch } from 'Functions/searchHelpers'
import Loading from 'Components/Shared/Loading'

const ListOrResults = ({ recordTypes, ...props }) => {
  if (allReady(props)) {
    // if has search set count and branch display
    const searching = hasSearch(props)
    if (!searching) {
      return null
    }
    const count = props.searchReducer.results.length
    return (
      <>
        <DisplayCount count={count} />
        {
          hasSearch(props) ? (
            <SearchResultsList
              recordTypes={recordTypes}
              results={props.searchReducer.results}
            />
          ) : (
            <RecordTypeList
              recordTypes={recordTypes}
            />
          )
        }
      </>
    )
  }
  return <Loading />
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default withRouter(connect(mapStateToProps)(ListOrResults))
