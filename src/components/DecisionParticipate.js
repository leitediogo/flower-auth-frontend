import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'


class DecisionParticipate extends Component {

    constructor(props, context) {
        console.log('DecisionParticipate::constructor')
        super(props, context)
        this.state = {
            decision: this.props.location.state.decision
        }
        this.handleAddCriterion = this.handleAddCriterion.bind(this)
        this.handleAddChoice = this.handleAddChoice.bind(this)
    }

    handleAddCriterion() {
        console.log('DecisionParticipate::handleAddCriterion')
        let criterionToAdd = {
            id: 'aaaa',
            name: 'bbbb',
            description: 'cccc',
        }
        let change = this.state
        change.decision.criteria.push(criterionToAdd)
        this.setState(change)
        //TODO: persist for realtime
    }

    handleAddChoice() {
        console.log('DecisionParticipate::handleAddChoice')
        let choiceToAdd = {
            id: 'aaaa',
            name: 'bbbb',
            description: 'cccc',
        }
        let change = this.state
        change.decision.choices.push(choiceToAdd)
        this.setState(change)
        //TODO: persist for realtime
    }

    render() {
        return (
            <div>
                <br />
                <b> Decision: </b>{this.props.location.state.decision.name}&nbsp;&nbsp;&nbsp;
                 <b> Description: </b>{this.props.location.state.decision.description}
                <br />
                <br />
                <FlatButton
                    label="Add Criterion"
                    primary={true}
                    onTouchTap={this.handleAddCriterion} />
                <FlatButton
                    label="Add Choice"
                    primary={true}
                    onTouchTap={this.handleAddChoice} />
                <br />
                <br />
                MATRIX
                <br />
            </div>
        )
    }
}

export default DecisionParticipate