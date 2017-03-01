import React, { Component } from 'react'
import { Table, TableRow, TableBody, TableRowColumn } from 'material-ui/Table'

class DecisionMatrix extends Component {
    render() {
        return (
            <div>
                Criteria:&nbsp;&nbsp;
                {this.props.decision.criteria.map((criterion, index) => (
                    <b key={index}>{criterion.name},&nbsp;</b>
                ))}
                <br />
                Choices:&nbsp;&nbsp;
                {this.props.decision.choices.map((choice, index) => (
                    <b key={index}>{choice.name},&nbsp;</b>
                ))}
                <br />
                <Table>
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

            </div>
        );
    }
}

export default DecisionMatrix;