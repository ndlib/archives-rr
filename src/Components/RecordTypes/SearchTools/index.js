import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { submitSearch } from '../../../Store/actions/searchActions'
import SubmitSearch from './SubmitSearch'
import {
  hasSearch,
  removeQueryOperator,
  splitTerms
} from '../functions/search'
import { filterRecordsByCategory } from '../functions/filter'
import './style.css'

class SearchTools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: hasSearch(props) ? removeQueryOperator(this.props.match.params.search) : ''
    }
    this.searchFieldOnChange = this.searchFieldOnChange.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
  }

  componentDidMount() {
    this.props.search(
      splitTerms(this.state.searchValue),
      filterRecordsByCategory(this.props, this.props.category),
      this.props.dispatch
    )
  }

  searchSubmit() {
    let base = 'recordTypes'
    if(this.props.match.params && this.props.match.params.category) {
      base = `records-by-category/${this.props.match.params.category}`
    }
    this.props.search(
      splitTerms(this.state.searchValue),
      filterRecordsByCategory(this.props, this.props.category),
      this.props.dispatch
    )
    this.props.history.push(`/${base}/q=${this.state.searchValue}`)
  }

  searchFieldOnChange(event) {
    this.setState({searchValue: removeQueryOperator(event.target.value)})
  }

  render() {
    return (
      <div className='searchTools'>
        <input
          type="text"
          className='searchField'
          name="searchField"
          spellCheck="true"
          defaultValue={this.state.searchValue || ''}
          onChange={(e) => { this.searchFieldOnChange(e)}}
        />
        <SubmitSearch
          searchBoxValue={this.state.searchValue}
          props={this.props}
          onSubmit={this.searchSubmit}
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => { return { ...state } }
const mapDispatchToProps = (dispatch) => ({ dispatch })
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const search = (terms, recordTypes, dispatch) => {
    dispatch(submitSearch(terms, recordTypes))
  }
  return {...stateProps, ...dispatchProps, ...ownProps, search}
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(SearchTools))
