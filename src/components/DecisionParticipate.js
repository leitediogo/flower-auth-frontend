import React, { Component } from 'react'
import utils from '../utils'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import DecisionMatrix from './DecisionMatrix'

class DecisionParticipate extends Component {

    constructor(props, context) {
        console.log('DecisionParticipate::constructor')
        super(props, context)
        this.state = {
            decision: this.props.location.state.decision,
            criterionName: '',
            criterionDescription: '',
            choiceName: '',
            choiceDescription: '',
            openCriteriaModal: false,
            openChoiceModal: false,
        }
        this.handleAddCriterion = this.handleAddCriterion.bind(this)
        this.handleAddChoice = this.handleAddChoice.bind(this)
        this.handleSaveCriterion = this.handleSaveCriterion.bind(this)
        this.handleSaveChoice = this.handleSaveChoice.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange = (e) => {
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleOpenCriteriaModal() {
        this.setState({ openCriteriaModal: true })
    }

    handleCloseCriteriaModal = () => {
        this.setState({ openCriteriaModal: false })
    }

    handleOpenChoiceModal() {
        this.setState({ openChoiceModal: true })
    }

    handleCloseChoiceModal = () => {
        this.setState({ openChoiceModal: false })
    }

    handleAddCriterion() {
        console.log('DecisionParticipate::handleAddCriterion')
        this.handleOpenCriteriaModal()
    }

    handleSaveCriterion() {
        console.log('DecisionParticipate::handleSaveCriterion')
        let uuid = utils.generateUUID()
        console.log(uuid)
        let criterionToAdd = {
            id: uuid,
            name: this.state.criterionName,
            description: this.state.criterionName,
        }
        let change = this.state
        change.decision.criteria.push(criterionToAdd)
        this.setState(change)
        console.log(this.state.decision)
        //TODO: post decision persist for realtime
        this.setState({ openCriteriaModal: false, criterionName: '', criterionDescription: '' })
    }

    handleAddChoice() {
        console.log('DecisionParticipate::handleAddChoice')
        this.handleOpenChoiceModal()
    }

    handleSaveChoice() {
        console.log('DecisionParticipate::handleSaveChoice')
        let uuid = utils.generateUUID()
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
        //TODO: post decision persist for realtime
        this.setState({ openChoiceModal: false, choiceName: '', choiceDescription: '' })
    }

    render() {
        const criteriaModalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseModal}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveCriterion}
            />,
        ]
        const choiceModalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseModal}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveChoice}
            />,
        ]
        return (
            <div>
                <br />
                <b> Decision: </b>{this.props.location.state.decision.name}&nbsp;&nbsp;&nbsp;
                 <b> Description: </b>{this.props.location.state.decision.description}&nbsp;&nbsp;&nbsp;
                 <b> Category: </b>{this.props.location.state.decision.category}
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
                <hr />
                <Dialog
                    title="Add Criteria"
                    actions={criteriaModalActions}
                    modal={false}
                    open={this.state.openCriteriaModal}
                    onRequestClose={this.handleCloseCriteriaModal}
                    autoScrollBodyContent={true}>
                    <TextField
                        id="criterionName"
                        hintText="Insert Criterion Name"
                        floatingLabelText="Criterion Name"
                        value={this.state.criterionName}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <TextField
                        id="criterionDescription"
                        hintText="Insert Criterion Description"
                        floatingLabelText="Criterion Description"
                        value={this.state.criterionDescription}
                        onChange={this.handleInputChange}
                    />
                </Dialog>
                <Dialog
                    title="Add Choice"
                    actions={choiceModalActions}
                    modal={false}
                    open={this.state.openChoiceModal}
                    onRequestClose={this.handleCloseChoiceModal}
                    autoScrollBodyContent={true}>
                    <TextField
                        id="choiceName"
                        hintText="Insert Choice Name"
                        floatingLabelText="Choice Name"
                        value={this.state.choiceName}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <TextField
                        id="choiceDescription"
                        hintText="Insert Choice Description"
                        floatingLabelText="Choice Description"
                        value={this.state.choiceDescription}
                        onChange={this.handleInputChange}
                    />
                </Dialog>
                <br />
                <DecisionMatrix decision={this.state.decision}/>
            </div>
        )
    }
}

export default DecisionParticipate