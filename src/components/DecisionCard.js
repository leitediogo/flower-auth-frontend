import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { browserHistory } from 'react-router'

let style = {
    margin: 20,
    textAlign: 'center'
}

class DecisionCard extends Component {

    handleParticipate = () => {
        console.log('DecisionCard::handleParticipate')
        browserHistory.push({
            pathname: '/decisionparticipate',
            state: { decision: this.props.decision.content }
        })
    }

    handleView = () => {
        console.log('DecisionCard::handleView')
        browserHistory.push({
            pathname: '/decisionview',
            state: { decision: this.props.decision.content }
        })
    }

    render() {
        return (
            <div>
                <Card zDepth={1} style={style}>
                    <CardHeader
                        title="Created By"
                        subtitle={this.props.decision.content.createdBy}
                        avatar={this.props.decision.content.ownerAvatar}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardTitle
                        title={this.props.decision.content.name}
                        subtitle={this.props.decision.content.category}
                    />
                    <CardText>{this.props.decision.content.description}</CardText>
                    <CardMedia expandable={true}>
                        <p>decision detail</p>
                    </CardMedia>
                    <CardActions expandable={true}>
                        <FlatButton label="Participate" onClick={this.handleParticipate} />
                        <FlatButton label="View" onClick={this.handleView} />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default DecisionCard