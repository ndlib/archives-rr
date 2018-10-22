import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Select from 'react-select'
import { advancedFieldOptions } from 'Constants/advancedFields'
import {
  setAdvancedSearch,
  removeAdvancedSearch,
} from 'Store/actions/searchActions'
import { advancedSearchStoreReady } from 'Store/storeReady'
import './style.css'

const AdvancedField = ({ field, options, ...props }) => {
  // make sure search field exists
  const activeField = advancedFieldOptions.find(option => {
    return option.value === field
  })
  if (!activeField) {
    return null
  }

  // try to set default value
  let defaultValue = null
  if (advancedSearchStoreReady && props.searchReducer.advancedSearch[activeField.value]) {
    defaultValue = {
      label: props.searchReducer.advancedSearch[activeField.value],
      value: props.searchReducer.advancedSearch[activeField.value],
    }
  }

  const { dispatch } = props
  return (
    <div className={`advancedField ${field}`}>
      <label>{activeField.label}</label>
      <Select
        value={defaultValue}
        onChange={(option) => {
          onChange(field, option, dispatch)
        }}
        options={options}
        isClearable
      />
    </div>
  )
}

const onChange = (field, option, dispatch) => {
  if (option) {
    dispatch(setAdvancedSearch(field, option.value))
  } else {
    dispatch(removeAdvancedSearch(field))
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}
export default withRouter(connect(mapStateToProps)(AdvancedField))
