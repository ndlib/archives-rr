import React from 'react'
import { connect } from 'react-redux'

import DivisionList from './DivisionList'

const divisionLeaders = [
  'President',
  'Provost',
  'Executive Vice President'
]

const Divisions = (props) => {
  if(
    props &&
    props.contentReducer &&
    props.contentReducer.divisions &&
    props.contentReducer.offices
  ) {

    return (
      <React.Fragment>
        <div className='text-content'>List of University Divisions goes here</div>
        {
          divisionLeaders.map(
            leader => {
              return (
                <DivisionList
                  key={leader}
                  divisionLeader={leader}
                />
              )
            }
          )
        }
      </React.Fragment>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}
export default connect(mapStateToProps)(Divisions)
