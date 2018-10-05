import React from 'react'

import DynamicContent from '../DynamicContent'
import CategoryList from './CategoryList'

const Categories = (props) => {
    return (
      <React.Fragment>
        <DynamicContent slug={'categories'}>
          <CategoryList/>
        </DynamicContent>
      </React.Fragment>
    )
}

export default Categories