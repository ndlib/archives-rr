import React from 'react'

import Toggle from '../../../Shared/Toggle'
import DateSearch from './DateSearch'
import './style.css'

const AdvancedSearch = (props) => {
    return (
      <Toggle
        label={<div className='x'>Advanced Search</div>}
        labelExpandedContent={<div>Hide Advanced Search</div>}
        defaultOpen // REMOVE
      >
        <DateSearch/>
      </Toggle>
    )
}

export default AdvancedSearch
