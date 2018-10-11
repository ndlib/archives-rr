// configure store
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

// required to use the redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore () {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      )
    )
  )
}
