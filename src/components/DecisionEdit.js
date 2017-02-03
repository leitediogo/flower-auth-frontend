import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Table, TableRow, TableBody, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import UpVote from './UpVote'

const styles = {
    paper: {
        margin: 20,
        textAlign: 'left',
        width: 500,
        height: 300
    }
}

class DecisionEdit extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            row: 0,
            col: 0,
            tmpCell: '',
            info: []
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

    handleSaveInformationModal = () => {
        console.log('handleSaveInformationModal')
        console.log(this.state.tmpCell)
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
            <div>
                <Paper zDepth={1} style={styles.paper}>
                    <Table onCellClick={this.handleInformationRow} fixedHeader={true}>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                            >
                            <TableRow>
                                {this.props.location.state.decision.criteria.map((criterion, index) => (
                                    <TableHeaderColumn key={index}>{criterion.name}</TableHeaderColumn>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} >
                            {this.props.location.state.decision.choices.map((choice, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn key={index}>{choice.name}</TableRowColumn>
                                    {this.props.location.state.decision.criteria.map((criterion, i) => (
                                        criterion.name === '-' ? '' :
                                            <TableRowColumn key={i}>{
                                                this.state.info.filter(function (info) {
                                                    return info.row === criterion.name && info.col === choice.name
                                                })[0] ? this.state.info.filter(function (info) {
                                                    return info.row === criterion.name && info.col === choice.name
                                                })[0].description : ''
                                            }</TableRowColumn>
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
                            tmpCell={this.state.tmpCell}
                            //handleInputChange={this.handleInputChange.bind(this)}
                            />
                    </Dialog>
                </Paper>
            </div>
        )
    }
}

export default DecisionEdit