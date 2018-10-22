import React from 'react'
import { withRouter } from 'react-router'

import Toggle from 'Components/Shared/Toggle'
import AdvancedFields from './AdvancedFields'
import { hasAdvancedSearch } from 'Functions/searchHelpers'
import './style.css'

const AdvancedSearch = (props) => {
  return (
    <React.Fragment>
      <Toggle
        label={<div className='advancedLabel'>Show Advanced Search</div>}
        labelExpandedContent={<div className='advancedLabel'>Hide Advanced Search</div>}
        defaultOpen={hasAdvancedSearch(props.match.params.search)}
      >
        <AdvancedFields />
      </Toggle>
    </React.Fragment>
  )
}

export default withRouter(AdvancedSearch)
