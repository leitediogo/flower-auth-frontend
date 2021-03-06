import React, { Component } from 'react'
import agent from 'superagent'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { browserHistory } from 'react-router'
import WizardContext from './WizardContext'
import WizardCriteria from './WizardCriteria'
import WizardChoices from './WizardChoices'
import WizardParticipants from './WizardParticipants'
import WizardMatrix from './WizardMatrix'
import { connectProfile } from '../auth'

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT

class Wizard extends Component {

    //Set decision owner
    //this.setState({owner: profile.nickname}, {createdBy: profile.nickname})
    //console.log(profile.nickname)

    constructor(props, context) {
        super(props, context)
        const {profile} = this.props
        this.state = {
            finished: false,
            stepIndex: 0,
            decision: {
                name: '',
                description: '',
                status: 'Creation',//Initial status
                category: '',
                createdBy: profile.name,
                owner: profile.name,
                ownerAvatar: profile.picture,
                participants: [],
                criteria: [],
                choices: [],
                info: []
            }
        }
    }

    handleInputChange = (e) => {
        let change = this.state
        change.decision[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleSelectCategoryChange = (event, index, value) => {
        let change = this.state
        change.decision.category = value
        this.setState(change)
        console.log(this.state)
    }

    handleNextWizard = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3,
        })
    }

    handleFinishWizard = () => {
        this.postDecision()
        browserHistory.push('/')
        window.location.reload()
    }

    handlePrevWizard = () => {
        const {stepIndex} = this.state
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 })
        }
    }

    handleSaveCriteria(name, desc, id) {
        let change = this.state
        let criterionToPush = {
            description: desc,
            name: name,
            id: id
        }
        change.decision.criteria.push(criterionToPush)
        this.setState(change)
    }

    handleSaveChoice(name, desc, id) {
        let change = this.state
        let choiceToPush = {
            description: desc,
            name: name,
            id: id
        }
        change.decision.choices.push(choiceToPush)
        this.setState(change)
    }

    handleSaveParticipant(name, role) {
        let change = this.state
        let participantToPush = {
            role: role,
            name: name
        }
        change.decision.participants.push(participantToPush)
        this.setState(change)
    }

    postDecision() {
        //TODO: Handle Error
        console.log('posting process!')
        agent.post('http://' + api_server_name + ':' + api_server_port + '/api/Decisions')
            .send({
                name: this.state.decision.name,
                definition: this.state.decision
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

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <WizardContext decision={this.state.decision} handleInputChange={this.handleInputChange.bind(this)} handleSelectCategoryChange={this.handleSelectCategoryChange.bind(this)} />)
            case 1:
                return (
                    <WizardCriteria decision={this.state.decision} handleSaveCriteria={this.handleSaveCriteria.bind(this)} />)
            case 2:
                return (
                    <WizardChoices decision={this.state.decision} handleSaveChoice={this.handleSaveChoice.bind(this)} />)
            case 3:
                return (
                    <WizardParticipants decision={this.state.decision} handleSaveParticipant={this.handleSaveParticipant.bind(this)} />)
            case 4:
                return (<WizardMatrix decision={this.state.decision} />)
            default:
                return 'Houston? Wizard has gone to default case.'
        }
    }

    render() {
        const {stepIndex} = this.state
        return (
            <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
                <br /><br /><br />
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Decision</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Criteria</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Choices</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Participation</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Information Matrix</StepLabel>
                    </Step>
                </Stepper>
                <div>
                    <div>
                        {this.getStepContent(stepIndex)}
                        <div style={{ marginTop: 12 }}>
                            <FlatButton
                                label="Back"
                                disabled={stepIndex === 0}
                                onTouchTap={this.handlePrevWizard}
                                style={{ marginRight: 12 }}
                            />
                            <RaisedButton
                                label={stepIndex === 4 ? 'Finish' : 'Next'}
                                primary={true}
                                onTouchTap={stepIndex === 4 ? this.handleFinishWizard : this.handleNextWizard}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connectProfile(Wizard)