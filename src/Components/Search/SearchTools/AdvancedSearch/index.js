import React from 'react'
import { withRouter } from 'react-router'

import Toggle from '../../../Shared/Toggle'
import DateSearch from './DateSearch'
import AdvancedFields from './AdvancedFields'
import { hasAdvancedSearch } from '../../../../Functions/searchHelpers'
import './style.css'

const AdvancedSearch = (props) => {
  return (
    <Toggle
      label={<div className='advancedLabel'>Show Advanced Search</div>}
      labelExpandedContent={<div className='advancedLabel'>Hide Advanced Search</div>}
      defaultOpen={hasAdvancedSearch(props.match.params.search)}
    >
      <DateSearch />
      <AdvancedFields />
    </Toggle>
  )
}

export default withRouter(AdvancedSearch)
