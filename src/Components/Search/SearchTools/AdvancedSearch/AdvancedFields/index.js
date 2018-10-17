import React from 'react'
import {
  triggerEventOptions,
  dispositionOptions,
  dispositionMethodOptions,
  referenceCopyOptions,
  referenceCopyDispositionOptions,
  referenceCopyDispositionMethodOptions,
} from '../../../../../Constants/advancedFields'

import AdvancedField from './AdvancedField'

const AdvancedFields = () => {
  return (
    <React.Fragment>
      <AdvancedField
        field={'triggerEvent'}
        options={triggerEventOptions}
      />
      <AdvancedField
        field={'disposition'}
        options={dispositionOptions}
      />
      <AdvancedField
        field={'dispositionMethod'}
        options={dispositionMethodOptions}
      />
      <AdvancedField
        field={'referenceCopy'}
        options={referenceCopyOptions}
      />
      <AdvancedField
        field={'referenceCopyDisposition'}
        options={referenceCopyDispositionOptions}
      />
      <AdvancedField
        field={'referenceCopyDispositionMethod'}
        options={referenceCopyDispositionMethodOptions}
      />
    </React.Fragment>
  )
}

export default AdvancedFields
