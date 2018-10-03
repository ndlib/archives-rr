import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { submitSearch } from '../../../Store/actions/searchActions'
import SubmitSearch from './SubmitSearch'
import {
  hasSearch,
  cleanSearchString,
  splitTerms
} from '../functions/search'
import './style.css'

class SearchTools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: hasSearch(props) ? cleanSearchString(this.props.match.params.search) : ''
    }
    this.props.dispatch(submitSearch(splitTerms(cleanSearchString(this.props.match.params.search))))
    this.searchFieldOnChange = this.searchFieldOnChange.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
  }

  onReceiveProps(nextProps) {
    if(nextProps.match.params.search !== this.match.params.search) {
      if (hasSearch(nextProps)) {
        this.setState({searchValue: cleanSearchString(nextProps.match.params.search)})
      }
    }
  }

  searchSubmit() {
    let base = 'recordTypes'
    if(this.props.match.params && this.props.match.params.category) {
      base = `records-by-category/${this.props.match.params.category}`
    }

    this.props.dispatch(submitSearch(splitTerms(cleanSearchString(this.state.searchValue))))
    this.props.history.push(`/${base}/q=${this.state.searchValue}`)
  }

  searchFieldOnChange(event) {
    this.setState({searchValue: cleanSearchString(event.target.value)})
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
export default withRouter(connect(mapStateToProps)(SearchTools))
