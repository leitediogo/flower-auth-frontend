import React, { Component } from 'react'
import agent from 'superagent'
import utils from '../utils'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'
import { connectProfile } from '../auth'
import DecisionContext from './DecisionContext'
import DecisionMatrix from './DecisionMatrix'
import DecisionAddParticipants from './DecisionAddParticipants'
import Divider from 'material-ui/Divider'

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT

class DecisionAdd extends Component {

    constructor(props, context) {
        super(props, context)
        const { profile } = this.props
        this.state = {
            decision: {
                id: '',
                name: '',
                description: '',
                status: 'CREATING',//PARTICIPATING | DECIDING | DECIDED
                category: '',
                createdBy: profile.name,
                owner: profile.name,
                ownerAvatar: profile.picture,
                participants: [],
                criteria: [],
                choices: [],
                info: []
            },
            criterionName: '',
            criterionDescription: '',
            choiceName: '',
            choiceDescription: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDecisionInputChange = this.handleDecisionInputChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDecisionInputChange = this.handleDecisionInputChange.bind(this)
        this.handleSelectDecisionCategoryChange = this.handleSelectDecisionCategoryChange.bind(this)
        this.handleSaveCriterion = this.handleSaveCriterion.bind(this)
        this.handleSaveChoice = this.handleSaveChoice.bind(this)
        this.postDecision = this.postDecision.bind(this)
        this.handleSaveDecision = this.handleSaveDecision.bind(this)
        this.handleCancelDecision = this.handleCancelDecision.bind(this)
        this.handleSaveParticipant = this.handleSaveParticipant.bind(this)
    }

    handleInputChange(e) {
        console.log('DecisionAdd::handleInputChange')
        console.log(e.target.id)
        console.log(e.target.value)
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Remove this, find a way to pass id with . in fields
    handleDecisionInputChange(e) {
        console.log('DecisionAdd::handleDecisionInputChange')
        console.log(e.target.id)
        console.log(e.target.value)
        let change = this.state
        change.decision[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleSelectDecisionCategoryChange(event, index, value) {
        console.log('DecisionAdd::handleSelectDecisionCategoryChange')
        let change = this.state
        change.decision.category = value
        this.setState(change)
        console.log(this.state)
    }

    handleSaveParticipant(name, role) {
        console.log('DecisionAdd::handleSaveParticipant')
        let change = this.state
        let participantToPush = {
            role: role,
            name: name
        }
        change.decision.participants.push(participantToPush)
        this.setState(change)
    }

    handleSaveCriterion() {
        console.log('DecisionAdd::handleSaveCriterion')
        let change = this.state
        let criterionId
        if (this.state.decision.criteria.length === 0) { criterionId = 2 }
        else {
            criterionId = this.state.decision.criteria[this.state.decision.criteria.length - 1].id + 1
        }
        let criterionToAdd = {
            id: criterionId,
            name: this.state.criterionName,
            description: this.state.criterionDescription
        }
        change.decision.criteria.push(criterionToAdd)
        //Add info cells to state
        let infoToAdd
        this.state.decision.choices.map(choice => {
            console.log('Info added by adding criteria: ', choice.id + ':' + criterionId)
            infoToAdd = {
                id: choice.id + ':' + criterionId,
                name: '-',
                description: ''
            }
            change.decision.info.push(infoToAdd)
            return choice //to eliminate warning 'Expected to return a value in this function  array-callback-return'
        })
        this.setState(change)
        this.setState({ criterionName: '', criterionDescription: '' })
        console.log(this.state)
    }

    handleSaveChoice() {
        console.log('DecisionAdd::handleSaveChoice')
        let choiceId
        let change = this.state
        if (this.state.decision.choices.length === 0) { choiceId = 2 }
        else { choiceId = this.state.decision.choices[this.state.decision.choices.length - 1].id + 1 }
        console.log('DecisionAdd::Id choice - ', choiceId)
        let choiceToAdd = {
            id: choiceId,
            name: this.state.choiceName,
            description: this.state.choiceDescription,
        }
        change.decision.choices.push(choiceToAdd)
        //Add info cells to state
        let infoToAdd
        this.state.decision.criteria.map(criteria => {
            infoToAdd = {
                id: choiceId + ':' + criteria.id,
                name: '-',
                description: ''
            }
            change.decision.info.push(infoToAdd)
            return criteria //to eliminate warning 'Expected to return a value in this function  array-callback-return'
        })
        this.setState(change)
        this.setState({ choiceName: '', choiceDescription: '' })
        console.log(this.state.decision)
    }

    //TODO: Handle Error 
    postDecision() {
        console.log('DecisionAdd::postDecision')
        agent.post('http://' + api_server_name + ':' + api_server_port + '/api/Decisions')
            .send({
                //id is auto generated by loopback
                name: this.state.decision.name,
                content: this.state.decision
            })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.error(err);
                } else {
                    console.log('yay! decision posted ' + JSON.stringify(res.body));
                }
            })
    }

    handleSaveDecision() {
        console.log('DecisionAdd::handleSaveDecision')
        //Generate Decision internal id
        let uuid = utils.generateUUID()
        let change = this.state
        change.decision['id'] = uuid
        this.setState(change)
        //Post Decision
        this.postDecision()
        browserHistory.push('/');
        //TODO: eliminate window.location.reload()
        window.location.reload()
    }

    handleCancelDecision() {
        console.log('DecisionAdd::handleCancelDecision')
        browserHistory.push('/')
    }

    render() {
        return (
            <div>
                <DecisionContext
                    decision={this.state.decision}
                    handleDecisionInputChange={this.handleDecisionInputChange}
                    handleSelectDecisionCategoryChange={this.handleSelectDecisionCategoryChange} />
                <br /><br />
                <DecisionAddParticipants
                    decision={this.state.decision}
                    handleSaveParticipant={this.handleSaveParticipant} />
                <DecisionMatrix
                    decision={this.state.decision}
                    handleInputChange={this.handleInputChange}
                    handleSaveCriterion={this.handleSaveCriterion}
                    handleSaveChoice={this.handleSaveChoice}
                    criterionName={this.state.criterionName}
                    criterionDescription={this.state.criterionDescription}
                    choiceName={this.state.choiceName}
                    choiceDescription={this.state.choiceDescription} />
                <br />
                <Divider />
                <div style={{ marginTop: 12 }}>
                    <FlatButton
                        label="Cancel"
                        onTouchTap={this.handleCancelDecision}
                        style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                        label="Save Decision"
                        primary={true}
                        onTouchTap={this.handleSaveDecision}
                    />
                </div>
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default connectProfile(DecisionAdd)