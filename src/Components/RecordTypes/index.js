import React from 'react'

import DynamicContent from '../DynamicContent'
import RecordTypeList from './RecordTypeList'

const RecordTypes = (props) => {
  return (
    <React.Fragment>
      <DynamicContent slug='recordTypes'>
        <RecordTypeList/>
      </DynamicContent>
    </React.Fragment>
  )
}

export default RecordTypes
