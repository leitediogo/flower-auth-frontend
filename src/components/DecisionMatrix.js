import React, { Component } from 'react'
import { Table, TableRow, TableBody, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import DecisionCriteriaChoiceUpvote from './DecisionCriteriaChoiceUpvote'

class DecisionMatrix extends Component {
    constructor() {
        super()
        this.state = {
            openInfoModal: false,
            openCriteriaModal: false,
            openChoiceModal: false,
            selectedRow: 0,
            selectedColumn: 0
        }

        this.handleOpenInfoModal = this.handleOpenInfoModal.bind(this)
        this.handleCloseInfoModal = this.handleCloseInfoModal.bind(this)
        this.handleSaveInfoCell = this.handleSaveInfoCell.bind(this)
        this.handleOpenCriteriaModal = this.handleOpenCriteriaModal.bind(this)
        this.handleCloseCriteriaModal = this.handleCloseCriteriaModal.bind(this)
        this.handleSaveCriteriaCell = this.handleSaveCriteriaCell.bind(this)
        this.handleOpenChoiceModal = this.handleOpenChoiceModal.bind(this)
        this.handleCloseChoiceModal = this.handleCloseChoiceModal.bind(this)
        this.handleSaveChoiceCell = this.handleSaveChoiceCell.bind(this)
    }

    handleOpenInfoModal(rowNumber, columnId) {
        console.log('DecisionMatrix::handleOpenModal')
        console.log('clicked row: ', rowNumber, ' column: ', columnId)
        this.setState({ selectedRow: rowNumber, selectedColumn: columnId })
        this.setState({ openInfoModal: true })
    }

    handleCloseInfoModal() {
        console.log('DecisionMatrix::handleCloseModal')
        this.setState({ openInfoModal: false })
    }

    handleSaveInfoCell() {
        console.log('DecisionMatrix::handleSaveInfoCell')
        console.log('clicked row: ', this.state.selectedRow, ' column: ', this.state.selectedColumn)
        this.handleCloseInfoModal()
    }

    handleOpenCriteriaModal() {
        this.setState({ openCriteriaModal: true })
    }

    handleCloseCriteriaModal() {
        this.setState({ openCriteriaModal: false })
    }

    handleSaveCriteriaCell() {
        console.log('DecisionMatrix::handleSaveCriteriaCell')
        this.props.handleSaveCriterion()
        this.handleCloseCriteriaModal()
    }

    handleOpenChoiceModal() {
        this.setState({ openChoiceModal: true })
    }

    handleCloseChoiceModal() {
        this.setState({ openChoiceModal: false })
    }

    handleSaveChoiceCell() {
        console.log('DecisionMatrix::handleSaveChoiceCell')
        this.props.handleSaveChoice()
        this.handleCloseChoiceModal()
    }

    render() {
        const infoModalactions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseInfoModal}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveInfoCell}
            />,
        ]
        const criteriaModalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseCriteriaModal}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveCriteriaCell}
            />,
        ]
        const choiceModalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseChoiceModal}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveChoiceCell}
            />,
        ]
        return (
            <div style={{ marginLeft: 12, marginRight: 12 }}>
                <br />
                <br />
                <FlatButton label="Add Choices" onTouchTap={this.handleOpenChoiceModal} />
                <FlatButton label="Add Criteria" onTouchTap={this.handleOpenCriteriaModal} />
                <Table onCellClick={this.handleOpenInfoModal}>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow />
                        <TableRow>
                            <TableRowColumn> DECISION </TableRowColumn>
                            {this.props.decision.criteria.map((criterion, index) => (
                                <TableRowColumn key={index}>{criterion.name}</TableRowColumn>
                            ))}
                        </TableRow>
                        {this.props.decision.choices.map((choice, index) => (
                            <TableRow key={index}>
                                <TableRowColumn key={index}>{choice.name}</TableRowColumn>
                                {this.props.decision.criteria.map((criterion, index) => (
                                    <TableRowColumn key={index}>{this.props.decision.info.filter(info => info.id === choice.id + ':' + criterion.id)[0].name}</TableRowColumn>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <FlatButton label="+" onTouchTap={this.handleOpenChoiceModal} />
                <Dialog
                    title="Add Criteria"
                    actions={criteriaModalActions}
                    modal={false}
                    open={this.state.openCriteriaModal}
                    onRequestClose={this.handleCloseCriteriaModal}
                    autoScrollBodyContent={true}>
                    <DecisionCriteriaChoiceUpvote
                        criterionName={this.props.criterionName}
                        criterionDescription={this.props.criterionDescription}
                        handleInputChange={this.props.handleInputChange} />
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
                        value={this.props.choiceName}
                        onChange={this.props.handleInputChange}
                    />
                    <br />
                    <TextField
                        id="choiceDescription"
                        hintText="Insert Choice Description"
                        floatingLabelText="Choice Description"
                        value={this.props.choiceDescription}
                        onChange={this.props.handleInputChange}
                    />
                </Dialog>
                <Dialog
                    title="Add Information"
                    actions={infoModalactions}
                    modal={false}
                    open={this.state.openInfoModal}
                    onRequestClose={this.handleCloseInfoModal}
                    autoScrollBodyContent={true}>
                    <br />
                    {this.state.selectedRow} :: {this.state.selectedColumn}
                </Dialog>
            </div>
        );
    }
}

export default DecisionMatrix;