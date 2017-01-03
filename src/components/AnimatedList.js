import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import './AnimatedList.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import avatar from '../images/avatar.jpg'
import TextField from 'material-ui/TextField'
import Thumbup from 'material-ui/svg-icons/action/thumb-up'
import Thumbdown from 'material-ui/svg-icons/action/thumb-down'
import Delete from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'

let cardStyle = {
    margin: 20,
    textAlign: 'left'
}

const divStyleRight = {
    marginRight: 20,
    paddingTop: 10,
    //marginLeft: 200,
    //paddingBottom: '10px',
    //alignItems: 'right',
    //display: 'inline-flex',
    //justifyContent: 'right',
    //alignContent: 'flex-end'
    //paddingLeft: '30px'
    float: 'right'
}

const iconStyle = {
    height: 20,
    width: 20,
}

const divStyleLeft = {
}

class AnimatedList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: ['falcon', 'xwing', 'tie', 'phantom'],
            info: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleAdd() {
        const newItems = this.state.items.concat([
            //prompt('Enter Information')
            this.state.info
        ]);
        this.setState({ items: newItems, info: '' })
    }

    handleRemove(i) {
        let newItems = this.state.items.slice()
        newItems.splice(i, 1);
        this.setState({ items: newItems })
    }

    handleInputChange = (e) => {
        let change = this.state
        change.info = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    render() {
        const items = this.state.items.map((item, i) => (
             <div key={item} onClick={() => this.handleRemove(i)}>
                <Card zDepth={3} style={cardStyle}>
                    <div style={divStyleRight}>
                        <Thumbup style={iconStyle} onClick={() => { console.log('clicked') } } />
                        <Thumbdown style={iconStyle} />
                        <center>10</center>
                        <center>
                            <Delete style={iconStyle} />
                        </center>
                    </div>
                    <div style={divStyleLeft}>
                        <CardHeader
                            title={item}
                            subtitle="description"
                            avatar={avatar}>
                        </CardHeader>
                    </div>
                </Card>
            </div>
        ));
        return (
            <MuiThemeProvider>
                <div>
                    <br />
                    col : {this.props.col}  row : {this.props.row}
                    <hr />
                    <TextField
                        id="info"
                        hintText="Insert information"
                        floatingLabelText="Information"
                        value={this.state.info}
                        onChange={this.handleInputChange}
                        />

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
                        {items}
                    </ReactCSSTransitionGroup>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default AnimatedList