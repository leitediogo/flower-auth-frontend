import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import './UpVote.css'
import { Card, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Delete from 'material-ui/svg-icons/action/delete'
import { connectProfile } from '../auth'

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
    constructor(props) {
        super(props)
        this.state = {
            listOfInfo: [],
            title: '',
            description: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleAdd() {
        console.log('handleAdd')
        const {profile} = this.props
        const newListOfInfo = this.state.listOfInfo.concat({
            title: this.state.title,
            description: this.state.description,
            avatar: profile.picture,
            votes: 0,
            blockThumbUp: false,
            blockThumbDown: true
        });
        this.setState({ listOfInfo: newListOfInfo, title: '', description: '' })
    }

    handleRemove(i) {
        console.log('handleRemove')
        let newListOfInfo = this.state.listOfInfo.slice()
        newListOfInfo.splice(i, 1);
        this.setState({ listOfInfo: newListOfInfo })
    }

    handleInputChange = (e) => {
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleThumbUp = (i) => {
        console.log('handleThumbUp: ', i)
        let change = this.state
        change.listOfInfo[i].votes += 1
        change.listOfInfo[i].blockThumbUp = true
        change.listOfInfo[i].blockThumbDown = false
        this.setState(change)
        //Sort list
        this.sortListOfObjects (this.state.listOfInfo, 'votes')
        //set infoValue state on upper component
        this.props.handleInfoValue(this.state.listOfInfo[0].title)
    }

    handleThumbDown = (i) => {
        console.log('handleThumbDown: ', i)
        let change = this.state
        change.listOfInfo[i].votes -= 1
        change.listOfInfo[i].blockThumbUp = false
        change.listOfInfo[i].blockThumbDown = true
        this.setState(change)
        //sort list
        this.sortListOfObjects (this.state.listOfInfo, 'votes')
        //set infoValue state on upper component
        this.props.handleInfoValue(this.state.listOfInfo[0].title)
    }

    //TODO::place this in separate utils file
    sortListOfObjects = (list, attr) => {
        list.sort(function (a, b) {
            return parseFloat(b[attr]) - parseFloat(a[attr])
        })
    }

    createlistOfInfo = () => {
        return (
            this.state.listOfInfo.map((info, i) => (
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
                            <ThumbUp style={styles.iconStyle} onClick={info.blockThumbUp ? () => console.log('noUP') : () => this.handleThumbUp(i)} />
                            <ThumbDown style={styles.iconStyle} onClick={info.blockThumbDown ? () => console.log('noDOWN') : () => this.handleThumbDown(i)} />
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
                    onClick={this.handleAdd}
                    label="Add" />
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                >
                    {this.createlistOfInfo()}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default connectProfile(UpVote)