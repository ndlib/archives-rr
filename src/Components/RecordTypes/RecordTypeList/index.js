import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import storeReady from '../../../Store/storeReady'
import RecordTypeLink from '../RecordTypeLink'
import Loading from '../../Loading'

const RecordTypeList = ({category, showEmpty, ...props}) => {
  if(storeReady(props)) {
    let recordTypes = props.contentReducer.recordTypes
    if(category) {
      recordTypes = recordTypes.filter(
        recordType => {
          return recordType.fields.category.fields.name === category.fields.name
        }
      )
    }

    return (
      <ul>
        {
          recordTypes.map(
            recordType => {
              return (
                <RecordTypeLink
                  key={recordType.sys.id}
                  recordType={recordType}
                  showEmpty={showEmpty}
                  {...props}
                />
              )
            }
          )
        }
      </ul>
    )
  }
  return <Loading/>
}

RecordTypeList.propTypes = {
  category: PropTypes.object,
  showEmpty: PropTypes.bool
}

RecordTypeList.defaultProps = {
  showEmpty: false
}

const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(RecordTypeList)
