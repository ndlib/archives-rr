import React from 'react'
import { connect } from 'react-redux'

import { categoriesReady } from 'Store/storeReady'

import Category from './Category'
import Loading from 'Components/Shared/Loading'
import './style.css'

const CategoryList = (props) => {
  if (categoriesReady(props)) {
    // filter out categories with different categoryal leader
    const categories = props.contentReducer.categories
    const maxPerColumn = Math.ceil(categories.length / 2)

    return (
      <div className='categoryList'>
        <div className='categoryListColumn'>
          { categories.slice(0, maxPerColumn).map((category) => (
            <Category key={category.sys.id} category={category} />
          ))}
        </div>
        <div className='categoryListColumn'>
          { categories.slice(maxPerColumn, maxPerColumn * 2).map((category) => (
            <Category key={category.sys.id} category={category} />
          ))}
        </div>
      </div>
    )
  }
  return <Loading />
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(CategoryList)
