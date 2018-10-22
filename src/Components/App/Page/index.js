import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import getToken from '../../../Store/actions/personal/token'
import Header from '../Branding/Header'
import Footer from '../Branding/Footer'
import AuthenticatedBody from './AuthenticatedBody'
import UnauthorizedBody from './UnauthorizedBody'

class Page extends Component {
  componentWillMount () {
    this.props.dispatch(getToken())
  }

  componentDidUpdate (prevProps) {
    // reset page to top after navigation
    if (this.props.location !== prevProps.loction) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <div className='page'>
        <Header />
        {
          <div>
            {/* // Do check here to see if authenticated
            // Return AuthenticatedBody if logged in
            <AuthenticatedBody>{this.props.children}</AuthenticatedBody>
            // else return UnauthorizedBody
            // <UnauthorizedBody /> */}
            <AuthenticatedBody>{this.props.children}</AuthenticatedBody>
          </div>
        }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default withRouter(connect(mapStateToProps)(Page))
