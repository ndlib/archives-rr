import React from 'react'
import { connect } from 'react-redux'

import { recordTypesReady, schedulesReady } from '../../Store/storeReady'
import Loading from '../Loading'
import SearchTools from './SearchTools'
import FilterDisclaimer from './FilterDisclaimer'
import ScheduleCount from './ScheduleCount'
import ScheduleList from './SchedulesList'
import {
  isFiltered,
  findRecordType,
  filterSchedules
} from './functions/filter'
import searchResults from './functions/search'

const Schedules = (props) => {
  if (schedulesReady(props) && recordTypesReady(props)) {
    // check if we have an recordType and if there is one, filter out schedules
    // from other recordTypes
    // also check if there is a search query and filter results based on that
    const recordType = findRecordType(props)
    const schedules = searchResults(filterSchedules(props, recordType), props)

    return (
      <React.Fragment>
        <FilterDisclaimer
          isFiltered={isFiltered(props)}
          recordType={recordType}
        />
        <SearchTools/>
        <ScheduleCount schedules={schedules} />
        <ScheduleList schedules={schedules} />
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(Schedules)
