import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'

class Toggle extends Component {
  constructor (props) {
    super(props)
    this.state = { open: this.props.defaultOpen }
  }

  render () {
    return (
      <React.Fragment>
        <span
          className={this.state.open ? 'less' : 'more'}
          onClick={() => {
            this.setState({ open: !this.state.open })
          }}
        >{ this.state.open && this.props.labelExpandedContent
            ? this.props.labelExpandedContent
            : this.props.label
          }</span>
        <div className={this.state.open ? 'open' : 'closed'}>
          { this.props.children }
        </div>
      </React.Fragment>
    )
  }
}

Toggle.propTypes = {
  label: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  labelExpandedContent: PropTypes.object,
  defaultOpen: PropTypes.bool,
}

Toggle.defaultProps = {
  defaultOpen: false,
}
export default Toggle
