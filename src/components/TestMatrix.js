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
                { id: '1:1', name: 'choice1-crit1', description: 'teste1' },
                { id: '1:2', name: 'choice1-crit2', description: 'teste2' },
                { id: '1:3', name: 'choice1-crit3', description: 'teste3' },
                { id: '2:1', name: 'choice2-crit1', description: 'teste4' },
                { id: '2:2', name: 'choice2-crit2', description: 'teste5' },
                { id: '2:3', name: 'choice2-crit3', description: 'teste6' },
                { id: '3:1', name: 'choice3-crit1', description: 'teste7' },
                { id: '3:2', name: 'choice3-crit2', description: 'teste8' },
                { id: '3:3', name: 'choice3-crit3', description: 'teste9' },
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
                                        <TableRowColumn key={index}>{this.state.info.filter(info => info.id === choice.id + ':' + criterion.id)[0].name}</TableRowColumn>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default TestMatrix