import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Table, TableRow, TableBody, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    paper: {
        margin: 20,
        textAlign: 'left',
        width: 500,
        height: 300
    }
}

class TestMatrix1 extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            row: 0,
            col: 0,
            tmpCell: '',
            decision: {
                criteria: [
                    { id: 0, name: '-' },
                    { id: 1, name: 'criteria1' },
                    { id: 2, name: 'criteria2' },
                    { id: 3, name: 'criteria3' }
                ],
                choices: [
                    { id: 1, name: 'choice1' },
                    { id: 2, name: 'choice2' },
                    { id: 3, name: 'choice3' }
                ]
            },
            info: [
                { rowCol: '02', name: 'choice1-crit1', description: 'teste' },
                { rowCol: '03', name: 'choice1-crit2', description: 'teste' },
                { rowCol: '04', name: 'choice1-crit3', description: 'teste' },
                { rowCol: '12', name: 'choice2-crit1', description: 'teste' },
                { rowCol: '13', name: 'choice2-crit2', description: 'teste' },
                { rowCol: '14', name: 'choice2-crit3', description: 'teste' },
                { rowCol: '22', name: 'choice3-crit1', description: 'teste' },
                { rowCol: '23', name: 'choice3-crit2', description: 'teste' },
                { rowCol: '24', name: 'choice3-crit3', description: 'teste' }
            ]
        }
    }

    handleInputChange = (e) => {
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleInformationRow = (rowNumber, columnId) => {
        console.log('clicked row: ', rowNumber, ' column: ', columnId)
        this.setState({ open: true, row: rowNumber, col: columnId })
    }

    handleInformationHeaderRow = (rowNumber, columnId) => {
        console.log('clicked row: ', rowNumber, ' column: ', columnId)
        //this.setState({ open: true, row: rowNumber, col: columnId })
    }

    handleSaveInformationModal = () => {
        console.log('handleSaveInformation')
        //set state to close modal
        this.setState({ open: false })
    }

    handleOpenModal() {
        this.setState({ open: true })
    }

    handleCloseModal = () => {
        this.setState({ open: false })
    }

    render() {

        const actionsInformationModal = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseModal}
                />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveInformationModal}
                />,
        ]

        return (
            <MuiThemeProvider>
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Paper zDepth={1} style={styles.paper}>
                        <Table onCellClick={this.handleInformationRow} fixedHeader={true}>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                enableSelectAll={false}>
                                <TableRow onCellClick={this.handleInformationHeaderRow}>
                                    {this.state.decision.criteria.map((row, index) => (
                                        <TableHeaderColumn key={index}>{row.name}</TableHeaderColumn>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} >
                                {this.state.decision.choices.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn></TableRowColumn>
                                        <TableRowColumn></TableRowColumn>
                                        <TableRowColumn></TableRowColumn>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                        <Dialog
                            title="Add Information for cell"
                            actions={actionsInformationModal}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleCloseModal}>
                            <br />
                            col : {this.state.col}
                            <br />
                            row : {this.state.row}
                            <hr />
                            <TextField
                                id="tmpCell"
                                hintText="Insert information"
                                floatingLabelText="Information"
                                value={this.state.tmpCell}
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                        </Dialog>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default TestMatrix1