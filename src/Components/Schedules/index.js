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
  searchMatches
} from './functions'

const Schedules = (props) => {
  if (schedulesReady(props) && officesReady(props)) {
    // get data ready with some helper functions
    const office = findOffice(props)
    const schedules = searchMatches(filterSchedules(props, office), props)

    return (
      <React.Fragment>
        <FilterDisclaimer
          isFiltered={isFiltered(props)}
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
