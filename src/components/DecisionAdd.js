import React, { Component } from 'react'
import agent from 'superagent'
import utils from '../utils'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'
import { connectProfile } from '../auth'
import DecisionContext from './DecisionContext'
import DecisionMatrix from './DecisionMatrix'

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
    }

    //Load some state in criteria and choices for testing matrix
    //Causes warning: TextField is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components
    componentDidMount() {
        let change = this.state
        change.decision = {
            criteria: [
                { id: '22342', name: 'criteria1', description: 'desc Crit1' },
                { id: '32432', name: 'criteria2', description: 'desc Crit2' },
                { id: '4v345', name: 'criteria3', description: 'desc Crit3' }
            ],
            choices: [
                { id: '2523r45', name: 'choice1', description: 'desc Choice1' },
                { id: '3234w25', name: 'choice2', description: 'desc Choice2' },
                { id: '23ewr454', name: 'choice3', description: 'desc Choice3' }
            ]
        }
        this.setState(change)
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

    handleSaveCriterion() {
        console.log('DecisionAdd::handleSaveCriterion')
        let uuid = utils.generateUUID()//uuid for criterion
        let criterionToAdd = {
            id: uuid,
            name: this.state.criterionName,
            description: this.state.criterionDescription,
        }
        let change = this.state
        change.decision.criteria.push(criterionToAdd)
        this.setState(change)
        console.log(this.state.decision)
        this.setState({ criterionName: '', criterionDescription: '' })
    }

    handleSaveChoice() {
        console.log('DecisionAdd::handleSaveChoice')
        let uuid = utils.generateUUID()//uuid for choice
        console.log(uuid)
        let choiceToAdd = {
            id: uuid,
            name: this.state.choiceName,
            description: this.state.choiceDescription,
        }
        let change = this.state
        change.decision.choices.push(choiceToAdd)
        this.setState(change)
        console.log(this.state.decision)
        this.setState({ choiceName: '', choiceDescription: '' })
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
                <DecisionMatrix
                    decision={this.state.decision}
                    handleInputChange={this.handleInputChange}
                    handleSaveCriterion={this.handleSaveCriterion}
                    handleSaveChoice={this.handleSaveChoice}
                    criterionName={this.state.criterionName}
                    criterionDescription={this.state.criterionDescription}
                    choiceName={this.state.choiceName}
                    choiceDescription={this.state.choiceDescription} />
                  <hr/>  
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
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default connectProfile(DecisionAdd)