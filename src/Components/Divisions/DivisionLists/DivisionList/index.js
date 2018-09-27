import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OfficeList from '../../../Offices/OfficeList'
import { mainOfficeFirst } from '../../../../Modules/mainOfficeFirst'
import { divisionsReady, officesReady} from '../../../../Modules/storeReady'
import Loading from '../../../Loading'

const DivisionList = ({divisionLeader, ...props}) => {
  if(divisionsReady(props) && officesReady(props)) {
    // filter out divisions with different divisional leader
    let divisions = props.contentReducer.divisions.filter(
      division => {
        return division.fields.divisionLeader === divisionLeader
      }
    )

    // move "Office of the [divsionLeader]" to the top of the list
    divisions = mainOfficeFirst(divisions, divisionLeader)

    return (
      <div className='divisionList'>
        <h2>{divisionLeader}</h2>
        <ul>
          { divisions.map(
            division => {
              return (
                <li key={division.sys.id}>
                  <h3>{division.fields.name}</h3>
                  <OfficeList
                    divisionLeader={divisionLeader}
                    division={division}
                    showEmpty
                  />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  return <Loading/>
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
