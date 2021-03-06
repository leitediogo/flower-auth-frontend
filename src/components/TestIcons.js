import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'

import Accessibility from 'material-ui/svg-icons/action/accessibility'
import Accessible from 'material-ui/svg-icons/action/accessible'

import Accountbalancewallet from 'material-ui/svg-icons/action/account-balance-wallet'
import Accountbox from 'material-ui/svg-icons/action/account-box'
import Accountcircle from 'material-ui/svg-icons/action/account-circle'
import Addshoppingcart from 'material-ui/svg-icons/action/add-shopping-cart'
import Alarm from 'material-ui/svg-icons/action/alarm'
import Alarmadd from 'material-ui/svg-icons/action/alarm-add'
import Alarmoff from 'material-ui/svg-icons/action/alarm-off'
import Alarmon from 'material-ui/svg-icons/action/alarm-on'
import Allout from 'material-ui/svg-icons/action/all-out'
import Android from 'material-ui/svg-icons/action/android'
import Announcement from 'material-ui/svg-icons/action/announcement'

import Accountbalance from 'material-ui/svg-icons/action/account-balance'
import Supervisor from 'material-ui/svg-icons/action/supervisor-account'
import Gavel from 'material-ui/svg-icons/action/gavel'
import Language from 'material-ui/svg-icons/action/language'
import Business from 'material-ui/svg-icons/communication/business'
import MonetizationOn from 'material-ui/svg-icons/editor/monetization-on'
import LocalATM from 'material-ui/svg-icons/maps/local-atm'
import CreditCard from 'material-ui/svg-icons/action/credit-card'
import InsertChart from 'material-ui/svg-icons/editor/insert-chart'
import AttachMoney from 'material-ui/svg-icons/editor/attach-money'
import Extension from 'material-ui/svg-icons/action/extension'
import Class from 'material-ui/svg-icons/action/class'


//Check Material svg icons by path
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
const iconStyles = {
    marginRight: 24,
};
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'



//check https://www.materialui.co/icons

class TestIcons extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <br />
                    <br />
                    <br />
                    <div>
                        <ActionFlightTakeoff style={iconStyles} color={red500} />
                        <ThumbDown style={iconStyles} color={red500} />
                        <ThumbUp style={iconStyles} color={red500} />
                        <HomeIcon style={iconStyles} />
                        <HomeIcon style={iconStyles} color={blue500} />
                        <HomeIcon style={iconStyles} color={red500} hoverColor={greenA200} />
                    </div>
                    <h1> Actions </h1>
                    <Visibility />
                    <VisibilityOff />
                    <Accessibility />
                    <Accessible />
                    <Accountbalance />
                    <Accountbalancewallet />
                    <Accountbox />
                    <Accountcircle />
                    <Addshoppingcart />
                    <Alarm />
                    <Alarmadd />
                    <Alarmoff />
                    <Alarmon />
                    <Allout />
                    <Android />
                    <Announcement />
                    <Supervisor />

                    <h1> Banking </h1>
                    <Business /> : Mortgage <br />
                    <Supervisor />  :Human Resources <br />
                    <Gavel /> : Risk & Compliance <br />
                    <Language /> : International <br />
                    <CreditCard /> : Cards <br />
                    <LocalATM /> : Payments <br />
                    <MonetizationOn /> : Trade Finance <br />
                    <Accountbalance /> : Operations & Execution <br />
                    <InsertChart /> : Marketing <br />
                    <AttachMoney /> : Sales & Service <br />
                    <Extension /> : IT Management <br />
                    <Class /> : Loans <br />


                </div>
            </MuiThemeProvider>
        );
    }
}

export default TestIcons;