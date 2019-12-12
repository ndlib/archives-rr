// react and routing
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'

// redux store
import { Provider } from 'react-redux'
import configureStore from 'Store/configureStore'

// page wrapper
// Page provides basic shared ui components and layout
// Page also does the initial population of the store
import Page from './Page'

// components for routes
import Home from 'Components/Home'
import Categories from 'Components/Categories'
import Search from 'Components/Search'
import RecordTypePage from 'Components/RecordTypePage'
import NotFound from 'Components/Shared/NotFound'

// create store
const store = configureStore()

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Page>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/search/:search?' component={Search} />
            <Route exact path='/recordType/:id/:search?' component={RecordTypePage} />
            <Route exact path='/users/auth/oktaoauth/callback' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Page>
      </Provider>
    </BrowserRouter>
  )
}

export default App
