import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { requireAuth } from '../auth'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
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

//Some components use react-tap-event-plugin (https://github.com/zilverline/react-tap-event-plugin) to listen for touch events (onTouchTap) because onClick is not fast enough (http://stackoverflow.com/a/34015469/988941)
//This dependency is temporary and will eventually go away. Until then, be sure to inject this plugin at the start of your app.
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

//pallete layout definition below
const muiTheme = getMuiTheme({
  //spacing: 30,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: 'gray',
    //primary2Color: 'green',
    //primary3Color: 'green',
    //accent1Color: 'green',
    //accent2Color: 'green',
    //accent3Color: 'green',
    //textColor: 'green',
    //alternateTextColor: 'green',
    //canvasColor: 'green',
    //borderColor: 'green',
    //disabledColor: fade('green', 0.3),
    //pickerHeaderColor: 'green',
    //clockCircleColor: fade('green', 0.07),
    //shadowColor: 'green',
  }
})

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
      <MuiThemeProvider muiTheme={muiTheme}>
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