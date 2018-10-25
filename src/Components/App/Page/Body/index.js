import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loading from 'Components/Shared/Loading'
import UnauthorizedBody from './UnauthorizedBody'
import UnauthenticatedBody from './UnauthenticatedBody'
import AuthenticatedBody from './AuthenticatedBody'
import { getToken } from 'Store/actions/personalActions'
import { isAuthorized } from 'Functions/personalHelpers'

class Body extends Component {
  componentDidMount () {
    const dispatch = this.props.dispatch
    dispatch(getToken())
  }

  render () {
    if (this.props && this.props.personalReducer) {
      if (!this.props.personalReducer.token) {
        // User has not logged in yet and has no JWT
        return <UnauthenticatedBody />
      } else if (isAuthorized(this.props.personalReducer)) {
        // User is logged in and authorized to see content
        return <AuthenticatedBody>{this.props.children}</AuthenticatedBody>
      } else if (!isAuthorized(this.props.personalReducer)) {
        // User is logged in but is unathorized to see content
        return <UnauthorizedBody />
      }
    }
    return <Loading />
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default withRouter(connect(mapStateToProps)(Body))
