import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { officesReady, schedulesReady } from '../../../Modules/storeReady'
import Loading from '../../Loading'
import SearchTools from './SearchTools'
import FilterDisclaimer from './FilterDisclaimer'
import ScheduleCount from './ScheduleCount'
import ScheduleListItem from './ScheduleListItem'

const ScheduleList = (props) => {
  if (schedulesReady(props) && officesReady(props)) {

    let schedules = props.contentReducer.schedules

    // keep track of the filtering office if there is one in the url
    let office
    let isFiltered = false
    // if office id in the url
    if(props.match && props.match.params && props.match.params.office) {
      // mark as filtered
      isFiltered = true
      // get the office so we can access name and other data
      office = props.contentReducer.offices.filter(
        o => {
          return o.sys.id === props.match.params.office
        }
      ).shift()
      // do the actual filtering of only schedules for this office
      // but make sure it's a valid office first
      if(office) {
        schedules = schedules.filter(
          schedule => {
            return schedule.fields.office.sys.id === props.match.params.office
          }
        )
      }
    }

    return (
      <React.Fragment>
        <FilterDisclaimer
          isFiltered={isFiltered}
          office={office}
        />
        <SearchTools/>
        {
          // make the list
          schedules.map(
            schedule => {
              return (
                <ScheduleListItem
                  key={schedule.sys.id}
                  schedule={schedule}
                />
              )
            }
          )
        }
        <ScheduleCount
          schedules={schedules}
        />
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

export default withRouter(connect(mapStateToProps)(ScheduleList))
