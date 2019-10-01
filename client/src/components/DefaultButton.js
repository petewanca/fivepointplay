import React, { Component } from 'react';

// Material-UI Components
import Button from '@material-ui/core/Button';

export default class DefaultButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: props.message,
            style: props.style,
            href: props.href,
        };
    }

    render() {
        return (
            <Button
                style={this.props.style}
                href={this.props.href}
                color="default"
                variant="contained">{this.state.message}
            </Button>
        )
    }
}

