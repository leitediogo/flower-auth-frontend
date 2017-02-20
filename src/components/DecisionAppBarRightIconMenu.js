import React, { Component } from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { connectProfile, logout } from '../auth'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import Avatar from 'material-ui/Avatar';

class DecisionAppBarRightIconMenu extends Component {
    render() {
        const {profile} = this.props
        return (
            <div>
                <IconButton tooltip="Notifications">
                    <NotificationsIcon />
                </IconButton>
                <IconMenu
                    iconButtonElement={<IconButton><Avatar src={profile.picture} size={30} /></IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem primaryText="Settings" href="/profile/edit" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out" onClick={() => { logout() }} />
                </IconMenu>
            </div>
        )
    }
}
export default connectProfile(DecisionAppBarRightIconMenu)