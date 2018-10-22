import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Navigation from '../../Navigation'
import { fetchContentType } from 'Store/actions/contentActions'
import './style.css'

class AuthenticatedBody extends Component {
  componentDidMount () {
    // populate the store
    const { dispatch } = this.props
    dispatch(fetchContentType('page', 'fields.name'))
    dispatch(fetchContentType('category', 'fields.name'))
    dispatch(fetchContentType('recordType', 'fields.recordType'))
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
