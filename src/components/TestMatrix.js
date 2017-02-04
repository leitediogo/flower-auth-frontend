import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Table, TableRow, TableBody, TableRowColumn } from 'material-ui/Table'


class TestMatrix extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            row: 0,
            col: 0,
            tmpCell: '',
            decision: {
                criteria: [
                    //{ id: 0, name: '-' },
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
                { row: '1', col: '2', name: 'choice1-crit1', description: 'teste' },
                { row: '1', col: '3', name: 'choice1-crit2', description: 'teste' },
                { row: '1', col: '4', name: 'choice1-crit3', description: 'teste' },
                { row: '2', col: '2', name: 'choice2-crit1', description: 'teste' },
                { row: '2', col: '3', name: 'choice2-crit2', description: 'teste' },
                { row: '2', col: '4', name: 'choice2-crit3', description: 'teste' },
                { row: '3', col: '2', name: 'choice3-crit1', description: 'teste' },
                { row: '3', col: '3', name: 'choice3-crit2', description: 'teste' },
                { row: '3', col: '4', name: 'choice3-crit3', description: 'teste' },
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
        this.setState({ row: rowNumber, col: columnId })
    }

    handleInformationHeaderRow = (rowNumber, columnId) => {
        console.log('clicked row: ', rowNumber, ' column: ', columnId)
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Table onCellClick={this.handleInformationRow} >
                        <TableBody displayRowCheckbox={false} >
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
                                        <TableRowColumn key={index}>-</TableRowColumn>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default TestMatrix