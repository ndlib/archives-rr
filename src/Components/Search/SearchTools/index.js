import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { submitSearch, clearSearch } from '../../../Store/actions/searchActions'
import SubmitSearch from './SubmitSearch'
import {
  hasSearch,
  removeQueryOperator,
  splitTerms
} from '../../../Functions/search'
import { filterRecordsByCategory } from '../../../Functions/filter'
import './style.css'

class SearchTools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: hasSearch(props) ? removeQueryOperator(this.props.match.params.search) : ''
    }
    this.searchFieldOnChange = this.searchFieldOnChange.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
    this.submitOnEnter = this.submitOnEnter.bind(this)
  }

  componentDidMount() {
    this.props.search(
      splitTerms(this.state.searchValue),
      filterRecordsByCategory(this.props, this.props.category),
      this.props.dispatch
    )
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearch())
  }

  // function called when search button pressed
  searchSubmit() {
    let base = 'search'
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

  // watch searchbox for changes, does not submit new value
  searchFieldOnChange(event) {
    this.setState({searchValue: removeQueryOperator(event.target.value)})
  }

  // lets user submit new search with enter key
  submitOnEnter(event) {
    // keycode 13 is the ENTER key
    if(event.keyCode === 13) {
      this.searchSubmit()
    }
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
          onChange={(e) => { this.searchFieldOnChange(e) }}
          onKeyDown={(e) => { this.submitOnEnter(e) }}
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
  // normally dispatch should be called in mapDispatchToProps, but we need to
  // know the current route, which is unavailable until we merge props
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
