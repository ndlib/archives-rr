import { combineReducers } from 'redux'
import contentReducer from './contentReducer'
import searchReducer from './searchReducer'
import personalReducer from './personalReducer'

export default combineReducers({
  contentReducer,
  searchReducer,
  personalReducer,
})
