import React from 'react'
import { connect } from 'react-redux'

import { officesReady, schedulesReady } from '../../Modules/storeReady'
import Loading from '../Loading'
import SearchTools from './SearchTools'
import FilterDisclaimer from './FilterDisclaimer'
import ScheduleCount from './ScheduleCount'
import ScheduleList from './SchedulesList'
import {
  isFiltered,
  findOffice,
  filterSchedules,
  hasSearch,
  searchMatches
} from './functions'

const Schedules = (props) => {
  if (schedulesReady(props) && officesReady(props)) {
    // get data ready with some helper functions
    const filtered = isFiltered(props)
    const office = findOffice(props)
    let schedules = filterSchedules(props, office)
    if(hasSearch(props)) {
      schedules = searchMatches(schedules, props.match.params.search)
    }

    return (
      <React.Fragment>
        <FilterDisclaimer
          isFiltered={filtered}
          office={office}
        />
        <SearchTools/>
        <ScheduleCount schedules={schedules} />
        <ScheduleList schedules={schedules} />
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Schedules)
