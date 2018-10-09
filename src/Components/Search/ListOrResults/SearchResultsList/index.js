import React from 'react'

import SearchResult from './SearchResult'

const SearchResultsList = ({recordTypes, results}) => {
  return (
    <div className='searchResults'>
      {
        results.map(result => {
          return (
            <SearchResult
              key={result.id}
              result={result}
              recordTypes={recordTypes}
            />
          )
        })
      }
    </div>
  )
}

export default SearchResultsList
