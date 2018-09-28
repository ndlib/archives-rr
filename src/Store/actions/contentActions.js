import { contentfulBaseUrl } from '../../Constants/contentfulBaseUrl'

// action types
export const RECEIVE_CATEGORYS = 'RECEIVE_CATEGORYS'
export const RECEIVE_RECORDTYPES = 'RECEIVE_RECORDTYPES'
export const RECEIVE_SCHEDULES = 'RECEIVE_SCHEDULES'
export const RECEIVE_PAGES = 'RECEIVE_PAGES'

const receiveContent = (actionType, json) => {
  return {
    type: actionType,
    payload: json
  }
}

export const fetchContentType = (type, orderField) => {
  // setup url
  // This part is for contentful_direct. It should not encode URI components
  const query = `query?locale=en-US&query=`
  // This is passed to Contentful and needs components encoded. (e.g. '&', '=')
  // Get a specific content type
  // Do the ordering here so we don't have to later
  // Include a depth of 2 so we can see the category data from the schedule and not just a link
  const queryValue = encodeURIComponent(`content_type=${type}&order=${orderField}&include=2`)
  // Put it all together as a safe URL
  const url = encodeURI(`${contentfulBaseUrl}${query}${queryValue}`)

  // dispatch and fetch data
  return dispatch => {
    return fetch(
      url, {
        method: 'get',
        // headers: {
        //   'Authorization': token,
        // },
    }).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    }).then(json => {
      switch(type) {
        case 'category':
          dispatch(receiveContent(RECEIVE_CATEGORYS, json))
          break
        case 'recordType':
          dispatch(receiveContent(RECEIVE_RECORDTYPES, json))
          break
        case 'schedule':
          dispatch(receiveContent(RECEIVE_SCHEDULES, json))
          break
        case 'page':
          dispatch(receiveContent(RECEIVE_PAGES, json))
          break
        default:
          console.log('no type for content fetch')
      }
    })
    .catch(e =>{
      console.log(e)
    })
  }
}
