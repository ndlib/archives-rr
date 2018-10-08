import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import DisplayCount from './DisplayCount'
import RecordTypeList from './RecordTypesList'
import SearchResultsList from './SearchResultsList'
import { allReady } from '../../../Store/storeReady'
import { hasSearch } from '../functions/search'
import Loading from '../../Loading'

const ListOrResults = ({recordTypes, ...props}) => {
  if(allReady(props)) {
    // if has search set count and branch display
    const count = hasSearch(props) ? props.searchReducer.results.length : recordTypes.length
    return (
      <React.Fragment>
        <DisplayCount count={count} />
        { hasSearch(props) ?
          <SearchResultsList
            recordTypes={recordTypes}
            results={props.searchReducer.results}
          /> :
          <RecordTypeList
            recordTypes={recordTypes} 
          />
        }
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => { return { ...state } }
export default withRouter(connect(mapStateToProps)(ListOrResults))
