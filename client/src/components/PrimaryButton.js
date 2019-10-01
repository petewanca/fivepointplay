import React, { Component } from 'react';

// Material-UI Components
import Button from '@material-ui/core/Button';

function PrimaryButton(props) {

        return (
            <div>
                <Button
                    href={props.href}
                    style={props.style}
                    color={props.color}
                    variant="contained">{props.message}
                </Button>
            </div>
        )
    }

    export default PrimaryButton;