import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Header from '../Branding/Header'
import Body from './Body'
import Footer from '../Branding/Footer'

class Page extends Component {
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
        <Body>{this.props.children}</Body>
        <Footer />
      </div>
    )
  }
}

export default withRouter(Page)
