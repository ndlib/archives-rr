import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  advancedFieldOptions,
  triggerEventOptions,
  dispositionOptions,
  dispositionMethodOptions,
  referenceCopyOptions,
  referenceCopyDispositionOptions,
  referenceCopyDispositionMethodOptions,
} from 'Constants/advancedFields'
import Select from 'react-select'

import AdvancedField from './AdvancedField'
import CategorySearch from './CategorySearch'

class AdvancedFields extends Component {
  constructor (props) {
    super(props)
    this.state = {
      availableFields: [],
      activeFields: [],
    }
    this.onChange = this.onChange.bind(this)
    this.updateFields = this.updateFields.bind(this)
  }

  componentDidMount () {
    this.updateFields(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updateFields(nextProps)
  }

  updateFields (props) {
    const keys = Object.keys(props.searchReducer.advancedSearch)
    this.setState({
      availableFields: advancedFieldOptions.filter(option => {
        return keys.indexOf(option.value) < 0
      }),
      activeFields: advancedFieldOptions.filter(option => {
        return keys.indexOf(option.value) > -1
      }),
    })
  }
  onChange (activeField) {
    this.setState({
      availableFields: this.state.availableFields.filter((field) => {
        return field.value !== activeField.value
      }),
      activeFields: [...this.state.activeFields, activeField],
    })
  }

  render () {
    return (
      <React.Fragment>
        <span>
          <label>Field Search</label>
          <Select
            value={null}
            onChange={(activeField) => {
              this.onChange(activeField)
            }}
            options={this.state.availableFields}
            placeholder='Select a field to search...'
          />
        </span>
        {/* <CategorySearch /> */}
        {
          this.state.activeFields.find(f => {
            return f.value === 'triggerEvent'
          })
            ? <AdvancedField
              field={'triggerEvent'}
              options={triggerEventOptions}
            /> : null
        }
        {
          this.state.activeFields.find(f => {
            return f.value === 'disposition'
          })
            ? <AdvancedField
              field={'disposition'}
              options={dispositionOptions}
            /> : null
        }
        {
          this.state.activeFields.find(f => {
            return f.value === 'dispositionMethod'
          })
            ? <AdvancedField
              field={'dispositionMethod'}
              options={dispositionMethodOptions}
            /> : null
        }
        {
          this.state.activeFields.find(f => {
            return f.value === 'referenceCopy'
          })
            ? <AdvancedField
              field={'referenceCopy'}
              options={referenceCopyOptions}
            /> : null
        }
        {
          this.state.activeFields.find(f => {
            return f.value === 'referenceCopyDisposition'
          })
            ? <AdvancedField
              field={'referenceCopyDisposition'}
              options={referenceCopyDispositionOptions}
            /> : null
        }
        {
          this.state.activeFields.find(f => {
            return f.value === 'referenceCopyDispositionMethod'
          })
            ? <AdvancedField
              field={'referenceCopyDispositionMethod'}
              options={referenceCopyDispositionMethodOptions}
            /> : null
        }
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(AdvancedFields)
