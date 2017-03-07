import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class DecisionContext extends Component {
    render() {
        return (
            <div style={{ marginLeft: 12 }}>
                <TextField
                    id="name"
                    hintText="Insert Decision Name"
                    floatingLabelText="Decision Name"
                    value={this.props.decision.name}
                    onChange={this.props.handleDecisionInputChange}
                />
                <br />
                <TextField
                    id="description"
                    hintText="Insert Decision Description"
                    floatingLabelText="Decision Description"
                    value={this.props.decision.description}
                    onChange={this.props.handleDecisionInputChange}
                    multiLine={true}
                    rows={2}
                />
                <br />
                <SelectField
                    id="category"
                    hintText="Insert Decision Category"
                    floatingLabelText="Decision Category"
                    value={this.props.decision.category}
                    onChange={this.props.handleSelectDecisionCategoryChange}>
                    <MenuItem value={'Government'} primaryText="Government" />
                    <MenuItem value={'Consumer'} primaryText="Consumer" />
                    <MenuItem value={'Corporate'} primaryText="Corporate" />
                    <MenuItem value={'Finance'} primaryText="Finance" />
                    <MenuItem value={'Legal'} primaryText="Legal" />
                    <MenuItem value={'Educational'} primaryText="Educational" />
                </SelectField>
                <br />
            </div>
        );
    }
}

export default DecisionContext