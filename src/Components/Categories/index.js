import React from 'react'

import DynamicContent from '../Shared/DynamicContent'
import CategoryList from './CategoryList'

const Categories = () => {
  return (
    <>
      <DynamicContent slug='categories'>
        <CategoryList />
      </DynamicContent>
    </>
  )
}

export default Categories
