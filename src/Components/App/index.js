import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Page from './Page'
import Home from '../Home'
import Divisions from '../Divisions'
import Policies from '../Policies'
import Policy from '../Policy'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Page>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/divisions' component={Divisions} />
            <Route exact path='/policies' component={Policies} />
            <Route exact path='/policies/:id' component={Policy} />
          </Switch>
        </Page>
      </BrowserRouter>
    )
  }
}

export default App
