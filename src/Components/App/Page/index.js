// react, router, and store connection
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

// shared layout and ui
import Header from '../Branding/Header'
import Footer from '../Branding/Footer'
import Navigation from '../Navigation'
import './style.css'

// actions
import  { fetchContentType } from '../../../Store/actions/contentActions'

class Page extends Component{
  componentDidMount() {
    // populate the store
    const { dispatch } = this.props
    dispatch(fetchContentType('division', 'fields.name'))
    dispatch(fetchContentType('office', 'fields.name'))
    dispatch(fetchContentType('policy', 'fields.recordTypeTitle'))
  }

  render() {
    return (
      <div className='page'>
        <Header />
        <Navigation />
        <div className='container-fluid'>
          <div className='mainContent'>{this.props.children}</div>
        </div>
        <Footer />
      </div>
    )
  }

}

// subscribe to the store
const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default withRouter(connect(mapStateToProps)(Page))
