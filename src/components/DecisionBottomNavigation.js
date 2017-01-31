import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import IconFavorites from 'material-ui/svg-icons/action/favorite'
import IconRecents from 'material-ui/svg-icons/navigation/refresh'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import { connectProfile } from '../auth'

const recentsIcon = <IconRecents />
const favoritesIcon = <IconFavorites />
const myDecisionsIcon = <AccountCircle />

let style ={
    position: "fixed",
    bottom: "0px",
    width: "100%",
}

class DecisionCatalogBottomNavigation extends Component {
    state = {
        selectedIndex: 0,
    }

    select = (index) => this.setState({ selectedIndex: index })

    render() {
        const {profile} = this.props
        return (
                <div style={style}>
                {(profile) ?
                    <Paper zDepth={1}>
                        <BottomNavigation selectedIndex={this.state.selectedIndex}>
                            <BottomNavigationItem
                                label="Recents"
                                icon={recentsIcon}
                                onTouchTap={() => this.select(0)}
                                />
                            <BottomNavigationItem
                                label="Favorites"
                                icon={favoritesIcon}
                                onTouchTap={() => this.select(1)}
                                />
                            <BottomNavigationItem
                                label="My Decisions"
                                icon={myDecisionsIcon}
                                onTouchTap={() => this.select(2)}
                                />
                        </BottomNavigation>
                    </Paper>
                     : ''}
                </div>
        )
    }
}

export default connectProfile(DecisionCatalogBottomNavigation)