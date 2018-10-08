import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RecordTypesList from '../../RecordTypes/ListOrResults/RecordTypesList'
import { categoriesReady, recordTypesReady} from '../../../Store/storeReady'
import { filterRecordsByCategory } from '../../RecordTypes/functions/filter'
import Loading from '../../Loading'

const CategoryList = (props) => {
  if(categoriesReady(props) && recordTypesReady(props)) {
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
                  <RecordTypesList
                    recordTypes={filterRecordsByCategory(props, category)}
                  />
                  <Link to={`/records-by-category/${category.sys.id}`}>
                    <div>View all record types for {category.fields.name}.</div>
                  </Link>
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
