import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class AnimatedCard extends Component {
    constructor() {
        super()
        this.state = {
            text: 'Test',
            height: '10vh'
        }
    }

    componentDidMount() {
        var self = this;
        setInterval(function () {
            self.setState({
                text: 'Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ',
                height: '15vh'
            })
        }, 2000)
    }

    render() {
        var cardStyle = {
            display: 'block',
            width: '80vw',
            transitionDuration: '0.3s',
            height: this.state.height
        }
        return (
            <div>
            <MuiThemeProvider>
                <Card style={cardStyle}>
                    <CardText>
                        {this.state.text}
                    </CardText>
                </Card>
            </MuiThemeProvider>
            </div>
        );
    }
}

export default AnimatedCard







