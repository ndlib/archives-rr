import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RecordTypeListItem from './RecordTypeListItem'
import Loading from '../Loading'
import { recordTypesReady } from '../../../Store/storeReady'

// This component does not correspond to its own page, but is used to create
// a list on the Categories page and on Search if there is no search query
const RecordTypeList = (props) => {
  if(recordTypesReady(props)){
    return (
      <React.Fragment>
        {
          props.recordTypes.map(
            recordType => {
              return (
                <RecordTypeListItem
                  key={recordType.sys.id}
                  recordType={recordType}
                />
              )
            }
          )
        }
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => { return { ...state } }
export default withRouter(connect(mapStateToProps)(RecordTypeList))
