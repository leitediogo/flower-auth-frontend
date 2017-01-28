import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { requireAuth } from '../auth'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import EditProfile from './EditProfile'
import DecisionCardList from './DecisionCardList'
import TestIcons from './TestIcons'
import TestMatrix from './TestMatrix'
import Wizard from './Wizard'
import agent from 'superagent'
import DecisionAppBar from './DecisionAppBar'
import DecisionBottomNavigation from './DecisionBottomNavigation'
import UpVote from './UpVote'
import TestProfile from './TestProfile'
import DecisionEdit from './DecisionEdit'
import DecisionView from './DecisionView'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT

class App extends Component {
  constructor() {
    super()
    this.state = {
      filteredDecisions: [],
      allDecisions: []
    }
  }

  componentDidMount() {
    agent.get('http://' + api_server_name + ':' + api_server_port + '/api/Decisions')
      //agent.get('http://localhost:3000/api/Decisions')
      .then(function (res) {
        this.setState({ allDecisions: res.body });
        this.setState({ filteredDecisions: res.body })
      }.bind(this));
  }

  filterDecisions(filter) {
    console.log('Decision Filter: ', filter)
    if (filter !== "All") {
      this.setState({
        filteredDecisions: this.state.allDecisions.filter(function (decision) {
          return decision.definition.category === filter
        })
      })
    } else {
      this.setState({
        filteredDecisions: this.state.allDecisions.filter(function (decision) {
          return decision
        })
      })
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <DecisionAppBar filterDecisions={this.filterDecisions.bind(this)} />
          <Router history={browserHistory}>
            <Route path="/" component={() => (<DecisionCardList decisions={this.state.filteredDecisions} />)} />
            {/* Testing Routes */}
            <Route path="/upvote" component={UpVote} />
            <Route path="/testmatrix" component={TestMatrix} />
            <Route path="/testicons" component={TestIcons} />
            {/* End Testing Routes */}
            <Route onEnter={requireAuth}>
              {/* Place all authenticated routes here */}
              <Route path="/profile/edit" component={EditProfile} />
              <Route path="/wizard" component={Wizard} />
              <Route path="/testprofile" component={TestProfile} />
              <Route path="/decisionedit" component={DecisionEdit} />
              <Route path="/decisionview" component={DecisionView} />
            </Route>
          </Router>
          <DecisionBottomNavigation />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App