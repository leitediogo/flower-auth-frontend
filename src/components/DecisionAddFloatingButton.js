import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

let style = {
    margin: 12,
    marginRight: 20,
    marginLeft: 20,
    position: "fixed",
    bottom: "8%",
    right: "1%"
}

class DecisionAddFloatingButton extends Component {
    render() {
        return (
            <FloatingActionButton style={style} href="\decisionadd">
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}

export default DecisionAddFloatingButton