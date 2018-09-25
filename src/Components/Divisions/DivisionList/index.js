import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OfficeList from './OfficeList'
import { mainOfficeFirst } from '../../../Modules/mainOfficeFirst'

const DivisionList = ({divisionLeader, ...props}) => {
  // filter out divisions with different divisional leader
  let filteredDivisions = props.contentReducer.divisions.filter(
    division => {
      return division.fields.divisionLeader === divisionLeader
    }
  )

  // move "Office of the [divsionLeader]" to the top of the list
  filteredDivisions = mainOfficeFirst(filteredDivisions, divisionLeader)

  return (
    <div className='divisionList'>
      <h2>{divisionLeader}</h2>
      <ul>
        { filteredDivisions.map(
          division => {
            return (
              <li key={division.sys.id}>
                <h3>{division.fields.name}</h3>
                <OfficeList
                  divisionLeader={divisionLeader}
                  division={division}
                />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

DivisionList.propTypes = {
  divisionLeader: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(DivisionList)
