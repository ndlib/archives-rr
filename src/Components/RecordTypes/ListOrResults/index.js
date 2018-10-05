import React from 'react'
import { connect } from 'react-redux'

import DisplayCount from './DisplayCount'
import RecordTypeList from './RecordTypesList'
import { allReady } from '../../../Store/storeReady'
import Loading from '../../Loading'

const ListOrResults = ({recordTypes, ...props}) => {
  if(allReady(props)) {
    // if has search set count and branch display
    return (
      <React.Fragment>
        <DisplayCount count={recordTypes.length} />
        <RecordTypeList recordTypes={recordTypes} />
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => { return { ...state } }
export default connect(mapStateToProps)(ListOrResults)
