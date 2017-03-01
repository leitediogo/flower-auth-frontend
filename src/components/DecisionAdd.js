import React, { Component } from 'react'
import agent from 'superagent'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'
import { connectProfile } from '../auth'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import utils from '../utils'

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT

const styles = {
    paper: {
        margin: 20,
        textAlign: 'left',
        width: 500,
        height: 300
    }
}

class DecisionAdd extends Component {

    constructor(props, context) {
        super(props, context)
        const {profile} = this.props
        this.state = {
            decision: {
                id: '',
                name: '',
                description: '',
                status: 'CREATING',//PARTICIPATING | DECIDING | DECIDED
                category: '',
                createdBy: profile.name,
                owner: profile.name,
                ownerAvatar: profile.picture,
                participants: [],
                criteria: [],
                choices: [],
                info: []
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this)
        this.postDecision = this.postDecision.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    } 

    handleInputChange = (e) => {
        console.log('DecisionAdd::handleInputChange')
        let change = this.state
        change.decision[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleSelectCategoryChange = (event, index, value) => {
        console.log('DecisionAdd::handleSelectCategoryChange')
        let change = this.state
        change.decision.category = value
        this.setState(change)
        console.log(this.state)
    }

    postDecision() {
        //TODO: Handle Error
        console.log('DecisionAdd::postDecision')
        agent.post('http://' + api_server_name + ':' + api_server_port + '/api/Decisions')
            .send({
                name: this.state.decision.name,
                definition: this.state.decision
            })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.error(err);
                } else {
                    console.log('yay! decision posted ' + JSON.stringify(res.body));
                }
            })
    }

    handleSave() {
        console.log('DecisionAdd::handleSave')
        //Generate Decision uuid
        console.log('Decision Id: ',utils.generateUUID())//Not used 
        //Not updating state because id already defined in API
        this.postDecision()
        browserHistory.push('/');
        //TODO: eliminate window.location.reload()
        window.location.reload()
    }

    handleCancel() {
        console.log('DecisionAdd::handleCancel')
        browserHistory.push('/')
    }

    render() {
        return (
            <div>
                <Paper zDepth={0} style={styles.paper}>
                    <TextField
                        id="name"
                        hintText="Insert Decision Name"
                        floatingLabelText="Decision Name"
                        value={this.state.decision.name}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <TextField
                        id="description"
                        hintText="Insert Decision Description"
                        floatingLabelText="Decision Description"
                        value={this.state.decision.description}
                        onChange={this.handleInputChange}
                        multiLine={true}
                        rows={2}
                    />
                    <br />
                    <SelectField
                        id="category"
                        hintText="Insert Decision Category"
                        floatingLabelText="Decision Category"
                        value={this.state.decision.category}
                        onChange={this.handleSelectCategoryChange}
                    >
                        <MenuItem value={'Government'} primaryText="Government" />
                        <MenuItem value={'Consumer'} primaryText="Consumer" />
                        <MenuItem value={'Corporate'} primaryText="Corporate" />
                        <MenuItem value={'Finance'} primaryText="Finance" />
                        <MenuItem value={'Legal'} primaryText="Legal" />
                        <MenuItem value={'Educational'} primaryText="Educational" />
                    </SelectField>
                    <br />
                    <div style={{ marginTop: 12 }}>
                        <FlatButton
                            label="Cancel"
                            onTouchTap={this.handleCancel}
                            style={{ marginRight: 12 }}
                        />
                        <RaisedButton
                            label="Save"
                            primary={true}
                            onTouchTap={this.handleSave}
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}

export default connectProfile(DecisionAdd)