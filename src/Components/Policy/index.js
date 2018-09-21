import React from 'react'

const Policy = ({match}) => {
  console.log(match)
  return (
    <div className='text-content'>Information about policy {match.params.id}</div>
  )
}
export default Policy
