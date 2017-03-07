import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

class DecisionCriteriaChoiceUpvote extends Component {
    render() {
        return (
            <div>
                <TextField
                    id="criterionName"
                    hintText="Insert Criterion Name"
                    floatingLabelText="Criterion Name"
                    value={this.props.criterionName}
                    onChange={this.props.handleInputChange}
                />
                <br />
                <TextField
                    id="criterionDescription"
                    hintText="Insert Criterion Description"
                    floatingLabelText="Criterion Description"
                    value={this.props.criterionDescription}
                    onChange={this.props.handleInputChange}
                />
            </div>
        );
    }
}

export default DecisionCriteriaChoiceUpvote;