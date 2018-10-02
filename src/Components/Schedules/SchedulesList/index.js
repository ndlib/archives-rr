import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ScheduleCount from './ScheduleCount'
import ScheduleListItem from './ScheduleListItem'
import Loading from '../../Loading'
import { schedulesReady } from '../../../Store/storeReady'
import {
  filterSchedules
} from '../functions/filter'
import searchResults from '../functions/search'

class ScheduleList extends Component {
  render() {
    if(schedulesReady(this.props)){
    const schedules = searchResults(filterSchedules(this.props, this.props.category), this.props)
      return (
        <React.Fragment>
          <ScheduleCount schedules={schedules} />
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
        </React.Fragment>
      )
    }
    return <Loading/>
  }
}
const mapStateToProps = (state) => { return { ...state } }
export default withRouter(connect(mapStateToProps)(ScheduleList))
