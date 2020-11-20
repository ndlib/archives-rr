import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Select from 'react-select'

import { searchableFields, getLabel } from 'Constants/fields'
import { submitSearch, clearSearch } from 'Store/actions/searchActions'
import SubmitSearch from './SubmitSearch'
import AdvancedSearch from './AdvancedSearch'
import {
  hasSearch,
  getRawQueryTerms,
  getQueryParam,
  splitTerms,
  getAdvancedSearchFromUrl,
  buildAdvancedSearchQuery,
} from 'Functions/searchHelpers'
import './style.css'

const fieldSearchOptions = [
  { value: 'all', label: 'All Fields' },
].concat(searchableFields.map(fieldName => ({
  value: fieldName,
  label: getLabel(fieldName),
})))

const termModeOptions = [
  { value: 'and', label: 'Match ALL terms (AND)' },
  { value: 'or', label: 'Match ANY term (OR)' },
  { value: 'near', label: 'Terms NEAR each other' },
]

class SearchTools extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: hasSearch(props) ? getRawQueryTerms(this.props.match.params.search) : '',
      fieldSearch: fieldSearchOptions.find(opt => opt.value === (getQueryParam(this.props.match.params.search, 'field') || 'all')),
      termMode: termModeOptions.find(opt => opt.value === (getQueryParam(this.props.match.params.search, 'termMode') || 'or')),
    }
    this.searchFieldOnChange = this.searchFieldOnChange.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
    this.submitOnEnter = this.submitOnEnter.bind(this)
    this.onChangeTermMode = this.onChangeTermMode.bind(this)
    this.onChangeFieldSearch = this.onChangeFieldSearch.bind(this)
  }

  componentDidMount () {
    this.props.search(
      splitTerms(this.state.searchValue),
      this.state.termMode.value,
      this.state.fieldSearch.value,
      this.props.contentReducer.recordTypes,
      getAdvancedSearchFromUrl(this.props.match.params.search),
      this.props.dispatch,
    )
  }

  componentWillReceiveProps (nextProps) {
    // if the url changes we need to update the search store
    if (nextProps.match.params.search !== this.props.match.params.search) {
      nextProps.search(
        splitTerms(this.state.searchValue),
        this.state.termMode.value,
        this.state.fieldSearch.value,
        nextProps.contentReducer.recordTypes,
        getAdvancedSearchFromUrl(nextProps.match.params.search),
        nextProps.dispatch,
      )
    }
  }

  componentWillUnmount () {
    this.props.dispatch(clearSearch())
  }

  // function called when search button pressed
  searchSubmit () {
    const advancedSearchQuery = buildAdvancedSearchQuery(this.props.searchReducer.advancedSearch)
    const queryParams = [
      { key: 'q', value: this.state.searchValue },
      { key: 'termMode', value: this.state.termMode.value },
      { key: 'field', value: this.state.fieldSearch.value },
    ].map(param => `${param.key}=${param.value}`).join('&')

    this.props.search(
      splitTerms(this.state.searchValue),
      this.state.termMode.value,
      this.state.fieldSearch.value,
      this.props.contentReducer.recordTypes,
      getAdvancedSearchFromUrl(advancedSearchQuery),
      this.props.dispatch,
    )
    this.props.history.push(`/search/${queryParams}${advancedSearchQuery}`)
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

  onChangeTermMode (selectedOption) {
    this.setState({ termMode: selectedOption })
  }

  onChangeFieldSearch (selectedOption) {
    this.setState({ fieldSearch: selectedOption })
  }

  render () {
    return (
      <div className='searchTools'>
        <div className='searchBar'>
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
            autoComplete='off'
          />
          <Select className='fieldSearch' options={fieldSearchOptions} value={this.state.fieldSearch} onChange={this.onChangeFieldSearch} />
          <Select className='termMode' options={termModeOptions} value={this.state.termMode} onChange={this.onChangeTermMode} />
          <SubmitSearch searchBoxValue={this.state.searchValue} props={this.props} onSubmit={this.searchSubmit} />
        </div>
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
  const search = (terms, termMode, fieldSearch, recordTypes, advancedSearch, dispatch) => {
    dispatch(submitSearch(terms, termMode, fieldSearch, recordTypes, advancedSearch))
  }
  return { ...stateProps, ...dispatchProps, ...ownProps, search }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  )(SearchTools))
