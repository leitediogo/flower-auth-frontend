import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { Table, TableRow, TableBody, TableRowColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import UpVote from './UpVote'

class DecisionParticipate extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            row: 0,
            col: 0,
            infoValue: '',
            info: []
        }
        this.handleSaveInfoValue = this.handleSaveInfoValue.bind(this)
    }

    componentWillMount() {
        console.log('DecisionParticipate::componentWillMount')
        //Populate default info cells if info empty
        if (this.props.location.state.decision.info.length === 0) {
            let newInfo = []
            this.props.location.state.decision.choices.map((choice) => (
                this.props.location.state.decision.criteria.map((criterion) => (
                    newInfo = newInfo.concat({ id: choice.id + ':' + criterion.id, name: ' ' })
                ))
            ))
            let change = this.state
            change.info = newInfo
            this.setState(change)
        }
    }

    handleSaveInfoValue = (row, column, value) => {
        console.log('handleSaveInfoValue')
        console.log(row + ':' + column + ':::' + value)
        let change = this.state
        change.info.filter(info => info.id === row + ':' + column)[0].name = value
        this.setState(change)
        console.log(this.state)
    }

    handleInputChange = (e) => {
        let change = this.state
        change[e.target.id] = e.target.value
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
            <div>
                <br />
                <Table onCellClick={this.handleInformationRow} >
                    <TableBody displayRowCheckbox={false} >
                        <TableRow />
                        <TableRow>
                            <TableRowColumn> - </TableRowColumn>
                            {this.props.location.state.decision.criteria.map((criterion, index) => (
                                <TableRowColumn key={index}>{criterion.name}</TableRowColumn>
                            ))}
                        </TableRow>
                        {this.props.location.state.decision.choices.map((choice, index) => (
                            <TableRow key={index}>
                                <TableRowColumn key={index}>{choice.name}</TableRowColumn>
                                {this.props.location.state.decision.criteria.map((criterion, index) => (
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
        )
    }
}

export default DecisionParticipate