export const divisionsReady = (props) => {
  return props && props.contentReducer && props.contentReducer.divisions
}
export const officesReady = (props) => {
  return props && props.contentReducer && props.contentReducer.offices
}
export const schedulesReady = (props) => {
  return props && props.contentReducer && props.contentReducer.schedules
}

const storeReady = (props) => {
  return divisionsReady(props) && officesReady(props) && schedulesReady(props)
}

export default storeReady
