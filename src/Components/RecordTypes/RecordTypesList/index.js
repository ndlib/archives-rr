import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RecordTypeCount from './RecordTypeCount'
import RecordTypeListItem from './RecordTypeListItem'
import Loading from '../../Loading'
import { recordTypesReady } from '../../../Store/storeReady'
import {
  filterRecordTypes
} from '../functions/filter'
import searchResults from '../functions/search'

class RecordTypeList extends Component {
  render() {
    if(recordTypesReady(this.props)){
    const recordTypes = searchResults(filterRecordTypes(this.props, this.props.category), this.props)
      return (
        <React.Fragment>
          <RecordTypeCount recordTypes={recordTypes} />
          {
            // make the list
            recordTypes.map(
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
}
const mapStateToProps = (state) => { return { ...state } }
export default withRouter(connect(mapStateToProps)(RecordTypeList))
