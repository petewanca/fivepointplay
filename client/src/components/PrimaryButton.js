import React, { Component } from 'react';

// Material-UI Components
import Button from '@material-ui/core/Button';

export default class PrimaryButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: props.message,
            style: props.style
        };
    }

    render() {
        return (
            <div>
                <Button
                    style={this.props.style}
                    color="primary"
                    variant="contained">{this.state.message}
                </Button>
            </div>
        )
    }
}