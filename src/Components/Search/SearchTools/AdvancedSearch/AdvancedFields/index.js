import React, { Component } from 'react'
import { connect } from 'react-redux'
import advancedFields, { advancedFieldOptions } from 'Constants/advancedFields'
import Select from 'react-select'

import AdvancedField from './AdvancedField'
import CategorySearch from './CategorySearch'
import DateSearch from './DateSearch'

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
      <>
        <Select
          value={null}
          onChange={this.onChange}
          options={advancedFields.map(field => ({
            value: field.name,
            label: field.label,
          }))}
          placeholder='Select a field to search...'
        />
        {this.state.activeFields.find(f => f.value === 'category') ? <CategorySearch /> : null}
        {// Insert all (active) generic fields with predefined options in the constants
          advancedFields.filter(field => field.options && this.state.activeFields.find(f => f.value === field.name))
            .map(field => (
              <AdvancedField key={field.name} field={field.name} options={field.options} />
            ))
        }
        {this.state.activeFields.find(f => f.value === 'dateSearch') ? <DateSearch /> : null}
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(AdvancedFields)
