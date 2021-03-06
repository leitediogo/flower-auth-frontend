import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import { Card, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Delete from 'material-ui/svg-icons/action/delete'
import { connectProfile } from '../auth'

//TODO::Add number of comments to top

let styles = {
    cardStyle: {
        margin: 20,
        textAlign: 'left',
    },
    divStyleRight: {
        marginRight: 10,
        paddingTop: 10,
        display: 'inline-flex',
        //justifyContent: 'right',
        //alignContent: 'flex-end',
        //paddingLeft: '50px',
        float: 'right',
        //border: '3px solid black'
    },
    iconStyle: {
        height: 20,
        width: 20,
    },
    divStyleLeft: {
        //border: '3px solid red',
        display: 'inline-flex'
    },
    divStyleCenter: {
        textAlign: 'center',
    }
}

class UpVote extends Component {

    constructor() {
        super()
        this.state = {
            list: [],
            topRecord: {
                title: '',
                description: '',
                votes: 0
            },
            title: '',
            description: ''
        }
        this.handleAddToList = this.handleAddToList.bind(this)
    }

    handleAddToList() {
        console.log('UpVote::handleAddToList')
        const { profile } = this.props
        const newlist = this.state.list.concat({
            title: this.state.title,
            description: this.state.description,
            avatar: profile.picture,
            votes: 0,
            voted: false
        });
        this.setState({ list: newlist, title: '', description: '' })
        //TODO: persist decision for realtime
    }


    handleRemove(i) {
        //TODO: Only creator removes
        console.log('UpVote::handleRemove')
        let newlist = this.state.list.slice()
        newlist.splice(i, 1);
        this.setState({ list: newlist })
        //TODO: persist decision for realtime
    }

    handleInputChange = (e) => {
        console.log('UpVote::handleInputChange')
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleVote = (i) => {
        console.log('UpVote::handleVote: ', i)
        let change = this.state
        change.list[i].votes += 1
        change.list[i].voted = true
        this.setState(change)
        //Sort list
        this.sortListOfObjects(this.state.list, 'votes')
        //set infoValue state on upper component
        //this.props.handleInfoValue(this.state.list[0].title)
        //update Top Record
        this.setState({ topRecord: this.state.list[0] })
        //TODO: persist decision for realtime
    }

    handleUnvote = (i) => {
        console.log('UpVote::handleUnvote: ', i)
        let change = this.state
        change.list[i].votes -= 1
        change.list[i].voted = false
        this.setState(change)
        //sort list
        this.sortListOfObjects(this.state.list, 'votes')
        //set infoValue state on upper component
        //this.props.handleInfoValue(this.state.list[0].title)
        //update Top Record
        this.setState({ topRecord: this.state.list[0] })
        //TODO: persist decision for realtime
    }

    //TODO::place this in separate utils file
    sortListOfObjects = (list, attr) => {
        list.sort(function (a, b) {
            return parseFloat(b[attr]) - parseFloat(a[attr])
        })
    }

    createlist = () => {
        return (
            this.state.list.map((info, i) => (
                <div key={i}>
                    <Card zDepth={3} style={styles.cardStyle} >
                        <div style={styles.divStyleLeft}>
                            <CardHeader
                                title={info.title}
                                subtitle={info.description}
                                avatar={info.avatar}>
                            </CardHeader>
                        </div>
                        <div style={styles.divStyleRight}>
                            <b>{info.votes}&nbsp;</b>
                            <ThumbUp style={styles.iconStyle} onClick={info.voted ? () => console.log('noUP') : () => this.handleVote(i)} />
                            <ThumbDown style={styles.iconStyle} onClick={!info.voted ? () => console.log('noDOWN') : () => this.handleUnvote(i)} />
                            <div>
                                <center>
                                    <Delete style={styles.iconStyle} onClick={() => this.handleRemove(i)} />
                                </center>
                            </div>
                        </div>
                    </Card>
                </div>
            ))
        )
    }

    render() {
        return (
            <div style={styles.divStyleCenter}>
                <br />
                <br />
                TOP RECORD : {this.state.topRecord.title}
                <br />
                <TextField
                    id="title"
                    hintText="Insert information"
                    floatingLabelText="Information"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                />
                <br />
                <TextField
                    id="description"
                    hintText="Insert Description"
                    floatingLabelText="Description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                />
                <br />
                <FlatButton
                    onClick={this.handleAddToList}
                    label="Add" />
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                >
                    {this.createlist()}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default connectProfile(UpVote)