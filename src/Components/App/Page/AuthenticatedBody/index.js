import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Navigation from '../../Navigation'
import { fetchContentType } from 'Store/actions/contentActions'
import './style.css'

class AuthenticatedBody extends Component {
  componentDidMount () {
    // populate the store
    const { dispatch, personalReducer } = this.props
    dispatch(fetchContentType('page', 'fields.name', personalReducer.token))
    dispatch(fetchContentType('category', 'fields.name', personalReducer.token))
    dispatch(fetchContentType('recordType', 'fields.recordType', personalReducer.token))
  }

  render () {
    return (
      <React.Fragment>
        <Navigation />
        <div className='container-fluid'>
          <div className='mainContent'>{this.props.children}</div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default withRouter(connect(mapStateToProps)(AuthenticatedBody))
