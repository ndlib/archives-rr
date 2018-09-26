import { contentfulBaseUrl } from '../../Constants/contentfulBaseUrl'

// action types
export const RECEIVE_DIVISIONS = 'RECEIVE_DIVISIONS'
export const RECEIVE_OFFICES = 'RECEIVE_OFFICES'
export const RECEIVE_SCHEDULES = 'RECEIVE_SCHEDULES'

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
  // Include a depth of 2 so we can see the division data from the schedule and not just a link
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
        case 'division':
          dispatch(receiveContent(RECEIVE_DIVISIONS, json))
          break
        case 'office':
          dispatch(receiveContent(RECEIVE_OFFICES, json))
          break
        case 'schedule':
          dispatch(receiveContent(RECEIVE_SCHEDULES, json))
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
