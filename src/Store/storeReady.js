// helper functions to let you know if the store is ready
const contentReducerReady = (props) => {
  return props && props.contentReducer
}
export const categoriesReady = (props) => {
  return contentReducerReady(props) && props.contentReducer.categories
}

export const recordTypesReady = (props) => {
  return contentReducerReady(props) && props.contentReducer.recordTypes
}

export const pagesReady = (props) => {
  return contentReducerReady(props) && props.contentReducer.pages
}

export const contentStoreReady = (props) => {
  return categoriesReady(props) && recordTypesReady(props) && pagesReady(props)
}

export const searchStoreExists = (props) => {
  return props && props.searchReducer
}

export const searchStoreReady = (props) => {
  return searchStoreExists(props) && !props.searchReducer.searching
}

export const allReady = (props) => {
  return searchStoreReady(props) && contentStoreReady(props)
}
