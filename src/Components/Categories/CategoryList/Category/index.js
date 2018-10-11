import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RecordTypesList from '../../../Shared/RecordTypesList'
import { filterRecordsByCategory } from '../../../../Functions/filterHelpers'
import { recordTypesReady } from '../../../../Store/storeReady'
import Loading from '../../../Shared/Loading'
import Toggle from '../../../Shared/Toggle'
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
            to={`/records-by-category/${props.category.sys.id}`
            }>
            <div>View all record types for {props.category.fields.name}.</div>
          </Link>
        </div>
      </Toggle>
    )
  }
  return <Loading />
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(Category)
