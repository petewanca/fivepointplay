import React, { Component } from 'react';

// Material-UI Components
import Button from '@material-ui/core/Button';

export default class PrimaryButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: props.message,
            style: props.style,
            color: props.color,
            href: props.href
        };
    }

    render() {
        return (
            <div>
                <Button
                    href={this.state.href}
                    style={this.state.style}
                    color={this.state.color}
                    variant="contained">{this.state.message}
                </Button>
            </div>
        )
    }
}