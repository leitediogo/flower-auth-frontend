import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Table, TableRow, TableBody, TableRowColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import UpVote from './UpVote'
import FlatButton from 'material-ui/FlatButton'

class TestMatrix extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            row: 0,
            col: 0,
            infoValue: '',
            decision: {
                criteria: [
                    { id: 2, name: 'criteria1', description: 'desc Crit1' },//Starts at 2 for cell handling
                    { id: 3, name: 'criteria2', description: 'desc Crit2' },
                    { id: 4, name: 'criteria3',  description: 'desc Crit3' }
                ],
                choices: [
                    { id: 2, name: 'choice1', description: 'desc Choice1'},
                    { id: 3, name: 'choice2',  description: 'desc Choice2' },
                    { id: 4, name: 'choice3',  description: 'desc Choice3' }
                ]
            },
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
        this.handleSaveInfoValue = this.handleSaveInfoValue.bind(this)
    }

    handleSaveInfoValue = (row, column, value) => {
        console.log('handleSaveInfoValue')
        console.log(row + ':' + column + ':::' + value)
        let change = this.state
        change.info.filter(info => info.id === row + ':' + column)[0].name = value
        this.setState(change)
        console.log(this.state)
    }

    handleInformationRow = (rowNumber, columnId) => {
        console.log('handleInformationRow')
        console.log('clicked row: ', rowNumber, ' column: ', columnId)
        this.setState({ open: true, row: rowNumber, col: columnId })
    }

    handleInfoValue = (value) => {
        console.log('handleInfoValue')
        let change = this.state
        change.infoValue = value
        this.setState(change)
        console.log(this.state)
    }

    //TODO:: here is were i save the cell
    handleSaveInformationModal = () => {
        console.log('handleSaveInformationModal')
        console.log('row ', this.state.row)
        console.log('column ', this.state.col)
        console.log('infoValue ', this.state.infoValue)
        this.handleSaveInfoValue(this.state.row, this.state.col, this.state.infoValue)
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
        const actions = [
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
                    <Table onCellClick={this.handleInformationRow} >
                        <TableBody displayRowCheckbox={false} >
                            <TableRow />
                            <TableRow>
                                <TableRowColumn> - </TableRowColumn>
                                {this.state.decision.criteria.map((criterion, index) => (
                                    <TableRowColumn key={index}>{criterion.name}</TableRowColumn>
                                ))}
                            </TableRow>
                            {this.state.decision.choices.map((choice, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn key={index}>{choice.name}</TableRowColumn>
                                    {this.state.decision.criteria.map((criterion, index) => (
                                        <TableRowColumn key={index}>{this.state.info.filter(info => info.id === choice.id + ':' + criterion.id)[0].name}</TableRowColumn>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Dialog
                        title="Add Information for cell"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleCloseModal}
                        autoScrollBodyContent={true}>
                        <UpVote
                            col={this.state.col}
                            row={this.state.row}
                            handleSaveInfoValue={this.handleSaveInfoValue}
                            handleInfoValue={this.handleInfoValue}
                        />
                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default TestMatrix