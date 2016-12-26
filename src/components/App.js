import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { requireAuth } from '../auth'
import Site from './Site'
import Home from './Home'
import Login from './Login'
import EditProfile from './EditProfile'
import DecisionCardList from './DecisionCardList'
import AddDecisionWizard from './AddDecisionWizard'
import IconTesting from './IconTesting'
import MatrixTryOut from './MatrixTryOut'
import Wizard from './Wizard'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route component={Site}>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route onEnter={requireAuth}>
              {/* Place all authenticated routes here */}
              <Route path="/profile/edit" component={EditProfile} />
              <Route path="/" component={() => (<DecisionCardList decisions={this.state.filteredDecisions} />)} />
              <Route path="/AddDecisionWizard" component={AddDecisionWizard} />
              <Route path="/icons" component={IconTesting} />
              <Route path="/matrix" component={MatrixTryOut} />
              <Route path="/wizard" component={Wizard} />
            </Route>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App
