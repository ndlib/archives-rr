// react and routing
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'

// redux store
import { Provider } from 'react-redux'
import configureStore from '../../Store/configureStore'

// page wrapper
// Page provides basic shared ui components and layout
// Page also does the initial population of the store
import Page from './Page'

// components for routes
import Home from '../Home'
import Divisions from '../Divisions'
import Offices from '../Offices'
import Policies from '../Policies'
import Policy from '../Policy'

// create store
const store = configureStore()

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Page>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/divisions' component={Divisions} />
            <Route exact path='/offices' component={Offices} />
            <Route exact path='/policies/:office?' component={Policies} />
            <Route exact path='/policy/:id' component={Policy} />
          </Switch>
        </Page>
      </Provider>
    </BrowserRouter>
  )
}

export default App
