import React from 'react'

import DivisionList from './DivisionList'

const divisionLeaders = [
  'President',
  'Provost',
  'Executive Vice President'
]

const DivisionLists = (props) => {
  return (
    <React.Fragment>
      {
        divisionLeaders.map(
          leader => {
            return (
              <DivisionList
                key={leader}
                divisionLeader={leader}
              />
            )
          })
      }
    </React.Fragment>
  )
}


export default DivisionLists
