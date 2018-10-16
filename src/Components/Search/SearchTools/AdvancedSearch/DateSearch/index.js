import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Select from 'react-select'
import moment from 'moment'

import DateField from './DateField'
import Loading from '../../../../Shared/Loading'
import DateWarning from './DateWarning'
import { setAdvancedSearch } from '../../../../../Store/actions/searchActions'
import { dateFieldOptions } from '../../../../../Constants/dateFieldOptions'
import './style.css'

class DateSearch extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (type, value) {
    const { dispatch } = this.props

    const dateSearch = this.props.searchReducer.advancedSearch.dateSearch
    const currentDateSearch = {
      type: dateSearch && dateSearch.type ? dateSearch.type : null,
      startDate: dateSearch && moment(dateSearch.startDate, 'YYYY-MM-DD').isValid() ? moment(dateSearch.startDate).format('YYYY-MM-DD') : null,
      endDate: dateSearch && moment(dateSearch.endDate, 'YYYY-MM-DD').isValid() ? moment(dateSearch.endDate).format('YYYY-MM-DD') : null,
    }

    switch (type) {
      case 'start':
        dispatch(setAdvancedSearch('dateSearch', {
          ...currentDateSearch,
          startDate: moment(value).isValid() ? moment(value).format('YYYY-MM-DD') : null,
        }))
        break
      case 'end':
        dispatch(setAdvancedSearch('dateSearch', {
          ...currentDateSearch,
          endDate: moment(value).isValid() ? moment(value).format('YYYY-MM-DD') : null,
        }))
        break
      case 'fields':
        dispatch(setAdvancedSearch('dateSearch', {
          ...currentDateSearch,
          type: value ? value.value : null,
        }))
        break
      default:
        console.log(`type: ${type} with value: ${value} cannot be set`)
    }
  }

  render () {
    if (this.props.searchReducer) {
      let startDate, endDate, fields
      if (this.props.searchReducer &&
        this.props.searchReducer.advancedSearch &&
        this.props.searchReducer.advancedSearch.dateSearch
      ) {
        const dateSearch = this.props.searchReducer.advancedSearch.dateSearch

        startDate = moment(dateSearch.startDate, 'YYYY-MM-DD').isValid()
          ? moment(dateSearch.startDate, 'YYYY-MM-DD')
          : null
        endDate = moment(dateSearch.endDate, 'YYYY-MM-DD').isValid()
          ? moment(dateSearch.endDate, 'YYYY-MM-DD')
          : null
        fields = dateFieldOptions.filter(option => {
          return option.value === dateSearch.type
        }).shift()
      }
      return (
        <div className='dateSearch'>
          <DateField
            label='Start Date'
            selectedDate={startDate}
            onChange={(date) => {
              this.onChange('start', date)
            }}
          />
          <DateField
            label='End Date'
            selectedDate={endDate}
            onChange={(date) => {
              this.onChange('end', date)
            }}
          />
          <span id='dateFieldOptions' className='dateField'>
            <label>Date Field Type</label>
            <Select
              value={fields}
              onChange={(field) => {
                this.onChange('fields', field)
              }}
              options={dateFieldOptions}
              isClearable
            />
          </span>
          <DateWarning
            startDate={startDate}
            endDate={endDate}
            fields={fields}
          />
        </div>
      )
    } return <Loading />
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}

export default withRouter(connect(mapStateToProps)(DateSearch))
