// helper functions to let you know if the store is ready
const reducerReady = (props) => {
  return props && props.contentReducer
}
export const categoriesReady = (props) => {
  return reducerReady(props) && props.contentReducer.categories
}

export const recordTypesReady = (props) => {
  return reducerReady(props) && props.contentReducer.recordTypes
}

export const pagesReady = (props) => {
  return reducerReady(props) && props.contentReducer.pages
}

const storeReady = (props) => {
  return categoriesReady(props) && recordTypesReady(props) && pagesReady(props)
}

export default storeReady
