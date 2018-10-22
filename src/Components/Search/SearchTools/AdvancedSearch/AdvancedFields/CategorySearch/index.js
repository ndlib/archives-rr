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
  let categories = props.contentReducer.categories.map(category => {
    return {
      value: category.sys.id,
      label: category.fields.name,
    }
  })

  // try to set default value
  let defaultValue = null
  if (advancedSearchStoreReady && props.searchReducer.advancedSearch['category']) {
    const category = props.contentReducer.categories.find(category => {
      return category.sys.id === props.searchReducer.advancedSearch['category']
    })
    if (category) {
      defaultValue = {
        label: category.fields.name,
        value: category.sys.id,
      }
    }
  }

  const { dispatch } = props
  return (
    <div className={`advancedField category`}>
      <label>Functional Category</label>
      <Select
        value={defaultValue}
        onChange={(option) => {
          onChange(option, dispatch)
        }}
        options={categories}
        isClearable
      />
    </div>
  )
}

const onChange = (option, dispatch) => {
  if (option) {
    dispatch(setAdvancedSearch('category', option.value))
  } else {
    dispatch(removeAdvancedSearch('category'))
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(CategorySearch)
