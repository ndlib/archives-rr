import { contentfulBaseUrl } from 'Constants/endpoints'

// action types
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_RECORDTYPES = 'RECEIVE_RECORDTYPES'
export const RECEIVE_PAGES = 'RECEIVE_PAGES'
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS'

const receiveContent = (actionType, json) => {
  return {
    type: actionType,
    payload: json,
  }
}

export const applySearchResultsToContent = (json) => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    payload: json,
  }
}

export const fetchContentType = (type, orderField, token) => {
  // setup url
  // This part is for contentful_direct. It should not encode URI components
  // const query = `archiveSecure?locale=en-US&query=`
  const query = `archiveSecure?locale=en-US&query=`
  // This is passed to Contentful and needs components encoded. (e.g. '&', '=')
  // Get a specific content type
  // Do the ordering here so we don't have to later
  // Include a depth of 2 so we can see the category data from the recordType and not just a link
  const queryValue = encodeURIComponent(`content_type=${type}&order=${orderField}&include=2`)
  // Put it all together as a safe URL
  const url = encodeURI(`${contentfulBaseUrl}${query}${queryValue}`)

  // dispatch and fetch data
  return (dispatch) => {
    if (token !== undefined) {
      return fetch(
        url, {
          method: 'get',
          headers: {
            'Authorization': token,
          },
        }).then(response => {
        if (response.status >= 200 && response.status < 400) {
          return response.json()
        } else {
          throw new Error(response.statusText)
        }
      }).then(json => {
        switch (type) {
          case 'category':
            dispatch(receiveContent(RECEIVE_CATEGORIES, json))
            break
          case 'recordType':
            dispatch(receiveContent(RECEIVE_RECORDTYPES, json))
            break
          case 'page':
            dispatch(receiveContent(RECEIVE_PAGES, json))
            break
          default:
            console.warn('no type for content fetch')
        }
      })
        .catch(e => {
          console.warn('Error fetching content: ' + e)
        })
    } else {
      console.warn('NOT SET IN CONTENT ACTIONS')
      return null
    }
  }
}
