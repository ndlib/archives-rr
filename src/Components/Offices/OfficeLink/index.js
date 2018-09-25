import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// We only want to have a link if this office has policies visible to the user
const OfficeLink = ({office, showEmpty, ...props}) => {

  // assume it has no policies
  let hasPolicies = false

  // check that it has at least one policy
  if(props && props.contentReducer && props.contentReducer.policies) {
     hasPolicies = props.contentReducer.policies.some((policy) => {
      return policy.fields.office.fields.name === office.fields.name
    })
  }

  if(hasPolicies) {
    return (
      <li key={office.sys.id}>
        <Link to={`/policies/${office.sys.id}`}>{office.fields.name}</Link>
      </li>
    )
  }
  if(showEmpty) {
    return (<li key={office.sys.id}>{office.fields.name}</li>)
  }
  return null
}

OfficeLink.propTypes = {
  office: PropTypes.object.isRequired
}

OfficeLink.defaultProps = {
  showEmpty: false
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(OfficeLink)
