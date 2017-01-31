import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { browserHistory } from 'react-router'

let style = {
    margin: 20,
    textAlign: 'center'
}

class DecisionCard extends Component {

    handleEdit = () => {
        console.log('edit')
        browserHistory.push({
            pathname: '/decisionedit',
            //search: '?process=' + this.props.process.name,
            state: { decision: this.props.decision.definition }
        })
    }

    render() {
        return (
                <div>
                    <Card zDepth={1} style={style}>
                        <CardHeader 
                            title="Created By" 
                            subtitle={this.props.decision.definition.createdBy} 
                            avatar={this.props.decision.definition.ownerAvatar} 
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardTitle 
                            title={this.props.decision.definition.name} 
                            subtitle={this.props.decision.definition.category} 
                        />
                        <CardText>{this.props.decision.definition.description}</CardText>
                        <CardMedia expandable={true}>
                            <p>decision detail</p>
                        </CardMedia>
                        <CardActions expandable={true}>
                            <FlatButton label="Edit" onClick={this.handleEdit}/>
                            <FlatButton label="View" href="\decisionview"/>
                        </CardActions>
                    </Card>
                </div>
        )
    }
}

export default DecisionCard