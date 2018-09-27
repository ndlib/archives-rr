import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { mainOfficeFirst } from '../../../Modules/mainOfficeFirst'
import storeReady from '../../../Modules/storeReady'
import OfficeLink from '../OfficeLink'
import Loading from '../../Loading'

const OfficeList = ({divisionLeader, division, showEmpty, ...props}) => {
  if(storeReady(props)) {

    let offices = props.contentReducer.offices
    if(division) {
      // filter out divisions with different divisional leader
      offices = offices.filter(
        office => {
          return office.fields.division.fields.name === division.fields.name
        }
      )
    }

    // move "Office of the [divsionLeader]" to the top of the list
    offices = mainOfficeFirst(offices, divisionLeader)
    return (
      <ul>
        {
          offices.map(
            office => {
              return (
                <OfficeLink
                  key={office.sys.id}
                  office={office}
                  showEmpty={showEmpty}
                  {...props}
                />
              )
            }
          )
        }
      </ul>
    )
  }
  return <Loading/>
}

OfficeList.propTypes = {
  divisionLeader: PropTypes.string,
  division: PropTypes.object,
  showEmpty: PropTypes.bool
}

OfficeList.defaultProps = {
  showEmpty: false
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(OfficeList)
