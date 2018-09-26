import React from 'react'
import { connect } from 'react-redux'

import OfficeLink from './OfficeLink'

const Offices = (props) => {
  if(
    props &&
    props.contentReducer &&
    props.contentReducer.offices
  ) {
    return (
      <React.Fragment>
        <div className='text-content'>List of University Offices goes here</div>
        <ul>
          {
            props.contentReducer.offices.map(
              office => {
                return (
                  <OfficeLink
                    key={office.sys.id}
                    office={office}
                  />
                )
              }
            )
          }
        </ul>
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

export default connect(mapStateToProps)(Offices)
