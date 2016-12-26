import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connectProfile, logout} from '../auth'
import './Site.css'
import DecisionAppBar from './DecisionAppBar'
import agent from 'superagent'
import DecisionBottomNavigation from './DecisionBottomNavigation'

class Site extends Component {
  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  };

  constructor() {
    super()
    this.state = {
      filteredDecisions: [],
      allDecisions: []
    }
  }

  componentDidMount() {
    agent.get('http://localhost:3000/api/Decisions')
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
      <div className="Site">
        <div className="Site-header">
          {this.renderUserControls()}
        </div>
        <div className="Site-page">
          {this.props.children}
        </div>
      </div>
    );
  }

  renderUserControls() {
    const {profile} = this.props;
    if (profile) {
      return (
        <div className="Site-profileControls">
         <DecisionAppBar filterDecisions={this.filterDecisions.bind(this)} />
          <img className="Site-profilePicture" src={profile.picture} alt={profile.nickname} />
          <Link to="/profile/edit">{profile.nickname}</Link> &middot; <a onClick={() => logout()}>Log Out</a>
          <DecisionBottomNavigation />
        </div>
      );
    } else {
      return (
        <div className="Site-profileControls">
          <span>Guest</span> &middot; <Link to="/login">Log In</Link>
        </div>
      );
    }
  }
}

export default connectProfile(Site);
