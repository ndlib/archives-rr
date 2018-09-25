import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { mainOfficeFirst } from '../../../../Modules/mainOfficeFirst'
import OfficeLink from '../../../Offices/OfficeLink'

const OfficeList = ({divisionLeader, division, ...props}) => {
  // filter out divisions with different divisional leader
  let filteredOffices = props.contentReducer.offices.filter(
    office => {
      return office.fields.division.fields.name === division.fields.name
    }
  )

  // move "Office of the [divsionLeader]" to the top of the list
  filteredOffices = mainOfficeFirst(filteredOffices, divisionLeader)

  return (
    <ul>
      {
        filteredOffices.map(
          office => {
            return (
              <OfficeLink
                key={office.sys.id}
                office={office}
                showEmpty
              />
            )
          }
        )
      }
    </ul>
  )
}

OfficeList.propTypes = {
  divisionLeader: PropTypes.string.isRequired,
  division: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(OfficeList)
