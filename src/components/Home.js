import React, { Component } from 'react'
import { connectProfile } from '../auth'
import './Home.css'

class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };

  render() {
    return (
      <div className="Home">
        <div className="Home-intro">
          <h2>Splash screen fantastico.</h2>
        </div>
      </div>
    );
  }
}

export default connectProfile(Home);
