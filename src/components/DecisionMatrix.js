import React, { Component } from 'react'
import { Table, TableRow, TableBody, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

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
        this.handleSaveInformationCell = this.handleSaveInformationCell.bind(this)
        this.handleOpenInfoModal = this.handleOpenInfoModal.bind(this)
        this.handleCloseInfoModal = this.handleCloseInfoModal.bind(this)
        this.handleOpenCriteriaModal = this.handleOpenCriteriaModal.bind(this)
        this.handleCloseCriteriaModal = this.handleCloseCriteriaModal.bind(this)
        this.handleOpenChoiceModal = this.handleOpenChoiceModal.bind(this)
        this.handleCloseChoiceModal = this.handleCloseChoiceModal.bind(this)
    }

    handleSaveInformationCell = () => {
        console.log('DecisionMatrix::handleSaveInformationCell')
        console.log('clicked row: ', this.state.selectedRow, ' column: ', this.state.selectedColumn)
        this.handleCloseInfoModal()
    }

    handleOpenInfoModal = (rowNumber, columnId) => {
        console.log('DecisionMatrix::handleOpenModal')
        console.log('clicked row: ', rowNumber, ' column: ', columnId)
        this.setState({ selectedRow: rowNumber, selectedColumn: columnId })
        this.setState({ openInfoModal: true })
    }

    handleCloseInfoModal = () => {
        console.log('DecisionMatrix::handleCloseModal')
        this.setState({ openInfoModal: false })
    }

    handleOpenCriteriaModal = () => {
        this.setState({ openCriteriaModal: true })
    }

    handleCloseCriteriaModal = () => {
        this.setState({ openCriteriaModal: false })
    }

    handleOpenChoiceModal = () => {
        this.setState({ openChoiceModal: true })
    }

    handleCloseChoiceModal = () => {
        this.setState({ openChoiceModal: false })
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
                onTouchTap={this.handleSaveInformationCell}
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
                onTouchTap={this.props.handleSaveCriterion}
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
                onTouchTap={this.props.handleSaveChoice}
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
                                    <TableRowColumn key={index}>-</TableRowColumn>
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
                    <TextField
                        id="criterionName"
                        hintText="Insert Criterion Name"
                        floatingLabelText="Criterion Name"
                        value={this.props.criterionName}
                        onChange={this.props.handleInputChange}
                    />
                    <br />
                    <TextField
                        id="criterionDescription"
                        hintText="Insert Criterion Description"
                        floatingLabelText="Criterion Description"
                        value={this.props.criterionDescription}
                        onChange={this.props.handleInputChange}
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