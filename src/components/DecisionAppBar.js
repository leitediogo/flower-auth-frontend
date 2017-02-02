import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import DecisionAppBarRightIconMenu from './DecisionAppBarRightIconMenu'
import DecisionAppBarLeftIconMenu from './DecisionAppBarLeftIconMenu'
import { browserHistory } from 'react-router'
import { connectProfile } from '../auth'
import FlatButton from 'material-ui/FlatButton'
import {login} from '../auth'

const styles = {
    title: {
        cursor: 'pointer'
    },
    bar: {
        //backgroundColor: 'lightGrey'
    }
}

class DecisionAppBar extends Component {

    handleAppBarClick() {
        console.log('handleAppBarClick')
        browserHistory.push('/')
    }

    render() {
        const {profile} = this.props;
        return (
                <div>
                    <AppBar
                        title={<span style={styles.title}>RPA</span>}
                        style={styles.bar}
                        onTitleTouchTap={this.handleAppBarClick}
                        iconElementRight={(profile) ? <DecisionAppBarRightIconMenu /> : <FlatButton label="Login" onClick={()=>{login()}}/>}
                        iconElementLeft={<DecisionAppBarLeftIconMenu filterDecisions={this.props.filterDecisions} />}
                        />
                </div>
        )
    }
}
export default connectProfile(DecisionAppBar)