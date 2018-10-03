import React from 'react'
import { connect } from 'react-redux'

import Loading from '../Loading'
import { recordTypesReady } from '../../Store/storeReady'

const RecordType = ({match, ...props}) => {
  if(recordTypesReady(props)) {
    // get the first (and only) matching recordType from the store
    const recordType = props.contentReducer.recordTypes.filter(s => {
      return s.sys.id === match.params.id
    }).shift()

    // render if it exists
    if(recordType) {
      return (
        <React.Fragment>
          <div className='text-content'>Information about recordType {recordType.sys.id}</div>
          <div>RecordType ID: {recordType.fields.recordTypeId}</div>
          <div>Belongs to function category: {recordType.fields.category.fields.name}</div>
          <pre style={{whiteSpace: 'pre-wrap'}}>
            {JSON.stringify(recordType)}
          </pre>
        </React.Fragment>
      )
    }

    // render message if not found
    return (
      <React.Fragment>
        <div className='text-content'>No matching recordType was found.</div>
      </React.Fragment>
    )
  }
  return <Loading/>

}

const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(RecordType)
