import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { schedulesReady } from '../../../Modules/storeReady'
import Loading from '../../Loading'

const ScheduleList = (props) => {
  if (schedulesReady(props)) {

    let schedules = props.contentReducer.schedules

    // if there is an office id in the url we should filter on it
    if(props.match && props.match.params && props.match.params.office) {
      schedules = schedules.filter(
        schedule => {
          return schedule.fields.office.sys.id === props.match.params.office
        }
      )
    }

    return (
      <React.Fragment>
        {
          schedules.map(
            schedule => {
              return (
                <div key={schedule.sys.id}>
                  <Link to={`/schedule/${schedule.sys.id}`}>{schedule.fields.recordTypeTitle}</Link>
                </div>
              )
            }
          )
        }
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
