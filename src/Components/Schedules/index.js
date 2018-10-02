import React from 'react'
import { connect } from 'react-redux'

import { categoriesReady } from '../../Store/storeReady'
import Loading from '../Loading'
import SearchTools from './SearchTools'
import FilterDisclaimer from './FilterDisclaimer'
import ScheduleList from './SchedulesList'
import {
  isFiltered,
  findCategory
} from './functions/filter'

const Schedules = (props) => {
  if (categoriesReady(props)) {
    const category = findCategory(props)

    return (
      <React.Fragment>
        <FilterDisclaimer
          isFiltered={isFiltered(props)}
          category={category}
        />
        <SearchTools/>
        <ScheduleList cateogry={category} />
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(Schedules)
