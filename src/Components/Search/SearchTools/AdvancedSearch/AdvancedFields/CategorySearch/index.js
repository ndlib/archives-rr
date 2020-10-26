import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import {
  advancedSearchStoreReady,
  categoriesReady,
} from 'Store/storeReady'
import {
  setAdvancedSearch,
  removeAdvancedSearch,
} from 'Store/actions/searchActions'

const CategorySearch = (props) => {
  if (!categoriesReady(props)) {
    return null
  }
  const categoryOptions = props.contentReducer.categories.map(category => {
    return {
      value: category.sys.id,
      label: category.fields.name,
    }
  })

  // try to set default value
  let categories = []
  if (advancedSearchStoreReady && props.searchReducer.advancedSearch.category) {
    categories = props.contentReducer.categories.filter(category => {
      const searchArray = Array.isArray(props.searchReducer.advancedSearch.category)
        ? props.searchReducer.advancedSearch.category
        : [props.searchReducer.advancedSearch.category]
      return searchArray.some(searchCat => searchCat === category.sys.id)
    })
  }

  const { dispatch } = props
  return (
    <div className='advancedField category'>
      <label>Functional Category</label>
      <Select
        value={categories.map(category => ({
          label: category.fields.name,
          value: category.sys.id,
        }))}
        onChange={(options) => {
          onChange(options, dispatch)
        }}
        options={categoryOptions}
        isClearable
        isMulti
      />
    </div>
  )
}

const onChange = (options, dispatch) => {
  if (Array.isArray(options) && options.length) {
    dispatch(setAdvancedSearch('category', options.map(opt => opt.value)))
  } else {
    dispatch(removeAdvancedSearch('category'))
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(CategorySearch)
