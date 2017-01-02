
import React, { Component } from 'react';
import TextField from 'material-ui/TextField'

class MatrixInfo extends Component {
    render() {
        return (
            <div>
                <br />
                col : {this.props.col}
                <br />
                row : {this.props.row}
                <hr />
                <TextField
                    id="tmpCell"
                    hintText="Insert information"
                    floatingLabelText="Information"
                    value={this.props.tmpCell}
                    onChange={this.props.handleInputChange.bind(this)}
                    />
                <br />
            </div>
        );
    }
}

export default MatrixInfo;