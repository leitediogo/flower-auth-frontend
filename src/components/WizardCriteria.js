import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import IconDelete from 'material-ui/svg-icons/action/delete'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Table, TableRow, TableBody, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'

const iconDelete = <IconDelete />

const styles = {
    paper: {
        margin: 20,
        textAlign: 'left',
        width: 500,
        height: 300
    },
    icons: {
        height: 20,
        width: 20
    }
}

class WizardCriteria extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            tmpCritName: '',
            tmpCritDesc: '',
            tmpCritId: '2' //Initial criteria Id, 2 because fo table headers
        }
    }

    handleInputChange = (e) => {
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleOpenModal = () => {
        this.setState({ open: true })
    }

    handleCloseModal = () => {
        this.setState({ open: false })
    }

    handleSendSaveCriteria = () => {
        console.log('handleSendSaveCriteria')
        //update global state
        this.props.handleSaveCriteria( this.state.tmpCritName, this.state.tmpCritDesc, this.state.tmpCritId++)
        //close modal
        this.setState({ open: false })
        //reset tmps 
        this.setState({ tmpCritName: '', tmpCritDesc: '' })
    }

    actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleCloseModal}
            />,
        <FlatButton
            label="Save"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSendSaveCriteria}
            />,
    ]

    render() {
        return (
            <div>
                <Paper zDepth={0} style={styles.paper}>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                            >
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Description</TableHeaderColumn>
                                <TableHeaderColumn>Action</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} >
                            {this.props.decision.criteria.map((row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.description}</TableRowColumn>
                                    <TableRowColumn>
                                        <FlatButton icon={iconDelete} href="/" />
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <RaisedButton label="Add Criteria" onTouchTap={this.handleOpenModal} fullWidth={true} />
                    <Dialog
                        title="Add Criteria"
                        actions={this.actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleCloseModal}
                        >
                        <TextField
                            id="tmpCritName"
                            hintText="Insert Criterion Name"
                            floatingLabelText="Criterion Name"
                            value={this.state.tmpCritName}
                            onChange={this.handleInputChange.bind(this)}
                            />
                        <br />
                        <TextField
                            id="tmpCritDesc"
                            hintText="Insert Criterion Description"
                            floatingLabelText="Criterion Description"
                            value={this.state.tmpCritDesc}
                            onChange={this.handleInputChange.bind(this)}
                            />
                    </Dialog>
                </Paper>
            </div>
        )
    }
}

export default WizardCriteria