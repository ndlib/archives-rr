export const RECEIVE_DIVISIONS = 'RECEIVE_DIVISIONS'
export const RECEIVE_OFFICES = 'RECEIVE_OFFICES'
export const RECEIVE_POLICIES = 'RECEIVE_POLICIES'

const receiveContent = (actionType, json) => {
  return {
    type: actionType,
    payload: json
  }
}

export const fetchContentType = (type) => {
  return dispatch => {
    const url = encodeURI(`https://cdtegp71x5.execute-api.us-east-1.amazonaws.com/arr/query?locale=en-US&query=content_type%3D${type}%26include%3d2`)

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
        case 'policy':
          dispatch(receiveContent(RECEIVE_POLICIES, json))
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
