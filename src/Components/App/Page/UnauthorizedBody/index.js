import React, { Component } from 'react'
import { connect } from 'react-redux'
import { viceroyAPI } from 'Constants/endpoints'

import { getToken } from 'Store/actions/personalActions'

class UnauthorizedBody extends Component {
  componentDidMount () {
    const dispatch = this.props.dispatch
    dispatch(getToken())
  }
  render () {
    return (
      <div className='container-fluid'>
        <div className='mainContent'>
          <div>Unauthorized</div>
          <div>Please log in to continue</div>
          <a href={`${viceroyAPI}/login`}><button>Log in</button></a>
          <a href={`${viceroyAPI}/logout`}><button>Log out</button></a>
        </div>

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(UnauthorizedBody)
