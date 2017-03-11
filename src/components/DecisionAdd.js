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
    //Handle when empty array ,first time
    componentDidMount() {
        let change = this.state
        change.decision = {
            choices: [
                { id: 2, name: 'choice1', description: 'desc Choice1' },
                { id: 3, name: 'choice2', description: 'desc Choice2' },
                { id: 4, name: 'choice3', description: 'desc Choice3' }
            ],
            criteria: [
                { id: 2, name: 'criteria1', description: 'desc Crit1' },//Starts at 2 for cell handling
                { id: 3, name: 'criteria2', description: 'desc Crit2' },
                { id: 4, name: 'criteria3', description: 'desc Crit3' }
            ],
            info: [
                { id: '2:2', name: 'choice1-crit1', description: 'teste1' },
                { id: '2:3', name: 'choice1-crit2', description: 'teste2' },
                { id: '2:4', name: 'choice1-crit3', description: 'teste3' },
                { id: '3:2', name: 'choice2-crit1', description: 'teste4' },
                { id: '3:3', name: 'choice2-crit2', description: 'teste5' },
                { id: '3:4', name: 'choice2-crit3', description: 'teste6' },
                { id: '4:2', name: 'choice3-crit1', description: 'teste7' },
                { id: '4:3', name: 'choice3-crit2', description: 'teste8' },
                { id: '4:4', name: 'choice3-crit3', description: 'teste9' },
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
        //let uuid = utils.generateUUID()//uuid for criterion
        let change = this.state
        let criterionId = this.state.decision.criteria[this.state.decision.criteria.length - 1].id + 1
        let criterionToAdd = {
            id: criterionId,
            name: this.state.criterionName,
            description: this.state.criterionDescription,
        }
        change.decision.criteria.push(criterionToAdd)
        //Add info cells to state
        this.state.decision.choices.map((choice) => {
            console.log('Info added by adding criteria: ', choice.id + ':' + criterionId)
            let infoToAdd = {
                id: choice.id + ':' + criterionId,
                name: '-',
                description: ''
            }
            change.decision.info.push(infoToAdd)
        })
        this.setState(change)
        this.setState({ criterionName: '', criterionDescription: '' })
        console.log(this.state)
    }

    handleSaveChoice() {
        console.log('DecisionAdd::handleSaveChoice')
        //let uuid = utils.generateUUID()//uuid for choice
        let change = this.state
        let choiceId = this.state.decision.choices[this.state.decision.choices.length - 1].id + 1
        console.log('DecisionAdd::Id choice - ', choiceId)
        let choiceToAdd = {
            id: choiceId,
            name: this.state.choiceName,
            description: this.state.choiceDescription,
        }
        change.decision.choices.push(choiceToAdd)
        //Add info cells to state
        this.state.decision.criteria.map((criteria) => {
            console.log('Info added by adding choice: ', choiceId + ':' + criteria.id)
            let infoToAdd = {
                id: choiceId + ':' + criteria.id,
                name: '-',
                description: ''
            }
            change.decision.info.push(infoToAdd)
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
                <DecisionMatrix
                    decision={this.state.decision}
                    handleInputChange={this.handleInputChange}
                    handleSaveCriterion={this.handleSaveCriterion}
                    handleSaveChoice={this.handleSaveChoice}
                    criterionName={this.state.criterionName}
                    criterionDescription={this.state.criterionDescription}
                    choiceName={this.state.choiceName}
                    choiceDescription={this.state.choiceDescription} />
                <hr />
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