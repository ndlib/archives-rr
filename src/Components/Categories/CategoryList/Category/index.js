import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RecordTypesList from 'Components/Shared/RecordTypesList'
import { recordTypesReady } from 'Store/storeReady'
import Loading from 'Components/Shared/Loading'
import Toggle from 'Components/Shared/Toggle'
import './style.css'

const Category = (props) => {
  if (recordTypesReady(props)) {
    return (
      <Toggle
        label={
          <h2
            className='functionalCategory'
          >{props.category.fields.name}</h2>
        }
      >
        <div className='collapseList'>
          <RecordTypesList
            recordTypes={filterRecordsByCategory(props, props.category)}
          />
          <Link
            className='lastLink'
            to={`/search/q=&a=category&v=${props.category.sys.id}`
            }>
            <div>View all record types for {props.category.fields.name}.</div>
          </Link>
        </div>
      </Toggle>
    )
  }
  return <Loading />
}

const filterRecordsByCategory = (props, category) => {
  let recordTypes = props.contentReducer.recordTypes
  if (category) {
    recordTypes = recordTypes.filter(
      recordType => {
        return recordType.fields.category.sys.id === category.sys.id
      }
    )
  }
  return recordTypes
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(Category)
