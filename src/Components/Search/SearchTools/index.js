import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { submitSearch, clearSearch } from 'Store/actions/searchActions'
import SubmitSearch from './SubmitSearch'
import AdvancedSearch from './AdvancedSearch'
import {
  hasSearch,
  getRawQueryTerms,
  splitTerms,
  getAdvancedSearchFromUrl,
  buildAdvancedSearchQuery,
} from 'Functions/searchHelpers'
import { filterRecordsByCategory } from 'Functions/filterHelpers'
import './style.css'

class SearchTools extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: hasSearch(props) ? getRawQueryTerms(this.props.match.params.search) : '',
    }
    this.searchFieldOnChange = this.searchFieldOnChange.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
    this.submitOnEnter = this.submitOnEnter.bind(this)
  }

  componentDidMount () {
    this.props.search(
      splitTerms(this.state.searchValue),
      filterRecordsByCategory(this.props, this.props.category),
      getAdvancedSearchFromUrl(this.props.match.params.search),
      this.props.dispatch
    )
  }

  componentWillReceiveProps (nextProps) {
    // if the url changes we need to update the search store
    if (nextProps.match.params.search !== this.props.match.params.search) {
      nextProps.search(
        splitTerms(this.state.searchValue),
        filterRecordsByCategory(nextProps, nextProps.category),
        getAdvancedSearchFromUrl(nextProps.match.params.search),
        nextProps.dispatch
      )
    }
  }

  componentWillUnmount () {
    this.props.dispatch(clearSearch())
  }

  // function called when search button pressed
  searchSubmit () {
    let base = 'search'
    if (this.props.match.params && this.props.match.params.category) {
      base = `records-by-category/${this.props.match.params.category}`
    }
    const advancedSearchQuery = buildAdvancedSearchQuery(this.props.searchReducer.advancedSearch)
    this.props.search(
      splitTerms(this.state.searchValue),
      filterRecordsByCategory(this.props, this.props.category),
      getAdvancedSearchFromUrl(advancedSearchQuery),
      this.props.dispatch
    )
    this.props.history.push(`/${base}/q=${this.state.searchValue}${advancedSearchQuery}`)
  }

  // watch searchbox for changes, does not submit new value
  searchFieldOnChange (event) {
    this.setState({ searchValue: getRawQueryTerms(event.target.value) })
  }

  // lets user submit new search with enter key
  submitOnEnter (event) {
    // keycode 13 is the ENTER key
    if (event.keyCode === 13) {
      this.searchSubmit()
    }
  }

  render () {
    return (
      <div className='searchTools'>
        <input
          type='text'
          className='searchField'
          name='searchField'
          spellCheck='true'
          defaultValue={this.state.searchValue || ''}
          onChange={(e) => {
            this.searchFieldOnChange(e)
          }}
          onKeyDown={(e) => {
            this.submitOnEnter(e)
          }}
        />
        <SubmitSearch
          searchBoxValue={this.state.searchValue}
          props={this.props}
          onSubmit={this.searchSubmit}
        />
        {this.props.searchReducer && this.props.searchReducer.advancedSearch ? <AdvancedSearch /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = (dispatch) => ({ dispatch })
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // normally dispatch should be called in mapDispatchToProps, but we need to
  // know the current route, which is unavailable until we merge props
  const search = (terms, recordTypes, advancedSearch, dispatch) => {
    dispatch(submitSearch(terms, recordTypes, advancedSearch))
  }
  return { ...stateProps, ...dispatchProps, ...ownProps, search }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(SearchTools))
