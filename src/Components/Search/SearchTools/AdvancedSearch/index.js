import React from 'react'

import Toggle from '../../../Shared/Toggle'
import './style.css'

const AdvancedSearch = (props) => {
    return (
      <Toggle
        label={<div className='x'>Advanced Search</div>}
        labelOpenContent={<div>Hide Advanced Search</div>}
      >
        <div>test content</div>
      </Toggle>
    )
}

export default AdvancedSearch
