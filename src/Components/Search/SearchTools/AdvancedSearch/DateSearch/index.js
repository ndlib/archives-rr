import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css'

class DateSearch extends Component {
  constructor (props) {
    super(props)
    this.fieldOptions = [
      { value: 'dateApprovedByGeneralCounsel', label: 'Approved' },
      { value: 'dateRevised', label: 'Revised' },
      { value: 'dateApprovedByGeneralCounsel&&dateRevised', label: 'Approved AND Revised' },
      { value: 'dateApprovedByGeneralCounsel||dateRevised', label: 'Approved OR Revised' },
    ]
    this.state = {
      startDate: null,
      endDate: null,
      fields: null,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (type, value) {
    switch (type) {
      case 'start':
        console.log(moment(value).format('YYYY-MM-DD'))
        this.setState({ startDate: value })
        break
      case 'end':
        console.log(moment(value).format('YYYY-MM-DD'))
        this.setState({ endDate: value })
        break
      case 'fields':
        console.log(type, value)
        this.setState({ fields: value })
        break
      default:
        console.log(`type: ${type} with value: ${value} cannot be set`)
    }
  }
  render () {
    return (
      <div className='dateSearch'>
        <span id='startDate' className='dateField'>
          <label>Start Date</label>
          <DatePicker
            selected={this.state.startDate}
            onChange={(date) => {
              this.onChange('start', date)
            }}
            isClearable
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            maxDate={moment().add('years', 1)}
          />
        </span>
        <span id='endDate' className='dateField'>
          <label>End Date</label>
          <DatePicker
            selected={this.state.endDate}
            onChange={(date) => {
              this.onChange('end', date)
            }}
            isClearable
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            maxDate={moment().add('years', 1)}
          />
        </span>
        <span id='dateFieldOptions' className='dateField'>
          <label>Date Field Type</label>
          <Select
            defaultValue={this.state.fields}
            onChange={(field) => {
              this.onChange('fields', field)
            }}
            options={this.fieldOptions}
            isClearable
          />
        </span>
        {
          (this.state.startDate || this.state.endDate) && !this.state.fields
            ? <div className='dateWarning'>*You must select a date field type to perform a date search.</div>
            : null
        }
        {
          (!this.state.startDate && !this.state.endDate) && this.state.fields
            ? <div className='dateWarning'>*You must specify at least a start or an end date.</div>
            : null
        }
      </div>
    )
  }
}

export default DateSearch
