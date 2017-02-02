import React from 'react'
import { Component } from 'react'
import DecisionCard from './DecisionCard'
import DecisionAddFloatingButton from './DecisionAddFloatingButton'
import { connectProfile } from '../auth'

let style = {
    margin: 20,
    textAlign: 'center'
}

class DecisionCardList extends Component {
    render() {
        const {profile} = this.props
        let cards = [];
        for (var i = 0; i < this.props.decisions.length; i++) {
            cards.push(<DecisionCard decision={this.props.decisions[i]} key={i} />)
        }
        return (
            <div>
                <br />
                <br />
                <br />
                <div style={style}>{cards}</div>
                {(profile) ? <DecisionAddFloatingButton /> : ''}
            </div>
        )
    }
}

export default connectProfile(DecisionCardList)