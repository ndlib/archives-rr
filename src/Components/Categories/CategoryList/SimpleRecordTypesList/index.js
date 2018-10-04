import React from 'react'
import { connect } from 'react-redux'

import SimpleRecordTypeListItem from './SimpleRecordTypeListItem'
import Loading from '../../../Loading'
import { recordTypesReady } from '../../../../Store/storeReady'
import {
  filterRecordsByCategory
} from '../../../RecordTypes/functions/filter'

const SimpleRecordTypeList = (props) => {
  if(recordTypesReady(props)){
    const recordTypes = filterRecordsByCategory(props, props.category)
    return (
      <React.Fragment>
        {
          recordTypes.map(
            recordType => {
              return (
                <SimpleRecordTypeListItem
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
export default connect(mapStateToProps)(SimpleRecordTypeList)
