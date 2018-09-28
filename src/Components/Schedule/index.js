import React from 'react'
import { connect } from 'react-redux'

import Loading from '../Loading'
import { schedulesReady } from '../../Store/storeReady'

const Schedule = ({match, ...props}) => {
  if(schedulesReady(props)) {
    // get the first (and only) matching schedule from the store
    const schedule = props.contentReducer.schedules.filter(s => {
      return s.sys.id === match.params.id
    }).shift()

    // render if it exists
    if(schedule) {
      return (
        <React.Fragment>
          <div className='text-content'>Information about schedule {schedule.sys.id}</div>
          <pre style={{whiteSpace: 'pre-wrap'}}>
            {JSON.stringify(schedule)}
          </pre>
        </React.Fragment>
      )
    }

    // render message if not found
    return (
      <React.Fragment>
        <div className='text-content'>No matching schedule was found.</div>
      </React.Fragment>
    )
  }
  return <Loading/>

}

const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(Schedule)
