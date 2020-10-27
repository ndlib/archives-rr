import React from 'react'
import { connect } from 'react-redux'
import { contentStoreReady } from 'Store/storeReady'
import Loading from 'Components/Shared/Loading'
import SearchTools from './SearchTools'
import ListOrResults from './ListOrResults'

const Search = (props) => {
  if (contentStoreReady(props)) {
    const recordTypes = props.contentReducer.recordTypes || []
    return (
      <>
        <SearchTools />
        <ListOrResults recordTypes={recordTypes} />
      </>
    )
  }
  return <Loading />
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Search)
