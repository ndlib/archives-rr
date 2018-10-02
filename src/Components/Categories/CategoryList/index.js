import React from 'react'
import { connect } from 'react-redux'

import SchedulesList from '../../Schedules/SchedulesList'
import { categoriesReady, schedulesReady} from '../../../Store/storeReady'
import Loading from '../../Loading'

const CategoryList = (props) => {
  if(categoriesReady(props) && schedulesReady(props)) {
    // filter out categories with different categoryal leader
    let categories = props.contentReducer.categories

    return (
      <div className='categoryList'>
        <ul>
          { categories.map(
            category => {
              return (
                <li key={category.sys.id}>
                  <h3>{category.fields.name}</h3>
                  <SchedulesList
                    category={category}
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


const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(CategoryList)
