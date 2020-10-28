import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import DisplayCount from './DisplayCount'
import SearchResultsList from './SearchResultsList'
import DownloadAll from 'Components/RecordTypePage/RecordTypeNav/DownloadAll'
import { allReady } from 'Store/storeReady'
import { hasSearch } from 'Functions/searchHelpers'
import Loading from 'Components/Shared/Loading'
import './style.css'

const ListOrResults = ({ recordTypes, ...props }) => {
  const download = () => {
    const url = `/recordType/${props.searchReducer.results[0].id}?download=true&${props.match.params.search}`
    props.history.push(url)
  }

  if (allReady(props)) {
    // if has search set count and branch display
    const searching = hasSearch(props)
    if (!searching) {
      return null
    }
    const count = props.searchReducer.results.length
    return (
      <>
        <div className='searchResultsInfoBar'>
          <DisplayCount count={count} />
          {count > 0 && (
            <DownloadAll onClick={download} />
          )}
        </div>
        <SearchResultsList
          recordTypes={recordTypes}
          results={props.searchReducer.results}
        />
      </>
    )
  }
  return <Loading />
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default withRouter(connect(mapStateToProps)(ListOrResults))
