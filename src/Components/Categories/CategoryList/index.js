import React from 'react'
import { connect } from 'react-redux'

import { categoriesReady } from '../../../Store/storeReady'

import Category from './Category'
import Loading from '../../Shared/Loading'

const CategoryList = (props) => {
  if (categoriesReady(props)) {
    // filter out categories with different categoryal leader
    let categories = props.contentReducer.categories

    return (
      <React.Fragment>
        { categories.map(
          category => {
            return (
              <Category
                key={category.sys.id}
                category={category}
              />
            )
          })
        }
      </React.Fragment>
    )
  }
  return <Loading />
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(CategoryList)
