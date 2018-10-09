import React, { Component } from 'react'

import Toggle from '../../../Shared/Toggle'
import './style.css'

class AdvancedSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <Toggle
        label={<div className='x'>Advanced Search</div>}
      >
        <div>test content</div>
      </Toggle>
    )
  }
}

export default AdvancedSearch
