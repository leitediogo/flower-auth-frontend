import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { browserHistory } from 'react-router'

let style = {
    margin: 20,
    textAlign: 'center'
}

class DecisionCard extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            decision: this.props.decision.definition
        }
    }

    handleParticipate = () => {
        console.log('Decision::handleParticipate')
        browserHistory.push({
            pathname: '/decisionparticipate',
            state: { decision: this.state.decision }
        })
    }

    handleView = () => {
        console.log('DecisionCard::handleView')
        browserHistory.push({
            pathname: '/decisionview',
            state: { decision: this.state.decision }
        })
    }

    render() {
        return (
            <div>
                <Card zDepth={1} style={style}>
                    <CardHeader
                        title="Created By"
                        subtitle={this.props.decision.definition.createdBy}
                        avatar={this.props.decision.definition.ownerAvatar}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardTitle
                        title={this.props.decision.definition.name}
                        subtitle={this.props.decision.definition.category}
                    />
                    <CardText>{this.props.decision.definition.description}</CardText>
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