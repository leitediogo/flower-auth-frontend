import React, { Component } from 'react'
import { connectProfile } from '../auth'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'

class TestProfile extends Component {
    render() {
        const {profile} = this.props;
        const user_metadata = profile.user_metadata || {};
        return (
            <MuiThemeProvider>
                <div>
                    <p><strong>Nickname:</strong> {profile.nickname}</p>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Created At:</strong> {profile.created_at}</p>
                    <p><strong>Updated At:</strong> {profile.updated_at}</p>
                    <p><strong>Location:</strong> {user_metadata.location || 'unknown'}</p>
                    <p><strong>Avatar:</strong>{<IconButton><Avatar src={profile.picture} size={30} /></IconButton>}</p>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default connectProfile(TestProfile)