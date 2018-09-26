import React from 'react'
import { connect } from 'react-redux'

const Schedules = (props) => {
  console.log(props)
  if(props.match && props.match.params && props.match.params.office) {
    console.log('should filter by office', props.match.params.office)
  }

  return (
    <React.Fragment>
      <div className='text-content'>An alphabetical listing of all schedules with search and filter functionality. Clicking an individual schedule will go to a page for only that schedule.</div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Schedules)
