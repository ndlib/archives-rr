import React from 'react'
import { connect } from 'react-redux'

import { contentStoreReady } from '../../Store/storeReady'
import Loading from '../Shared/Loading'
import SearchTools from './SearchTools'
import FilterDisclaimer from './FilterDisclaimer'
import ListOrResults from './ListOrResults'
import {
  isFiltered,
  findCategory,
  filterRecordsByCategory
} from '../../Functions/filter'

const Search = (props) => {
  if (contentStoreReady(props)) {
    const category = findCategory(props)
    const recordTypes = filterRecordsByCategory(props, category) || []
    return (
      <React.Fragment>
        <FilterDisclaimer
          isFiltered={isFiltered(props)}
          category={category}
        />
        <SearchTools category={category}/>
        <ListOrResults recordTypes={recordTypes}/>
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(Search)
