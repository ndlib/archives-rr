import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RecordTypeListItem from './RecordTypeListItem'
import Loading from '../../../Loading'
import { recordTypesReady } from '../../../../Store/storeReady'

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
