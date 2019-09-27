import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LButton = withStyles({
    root: {
        fontSize: "1rem",
        float: "right",
        marginTop: "1rem",
    }
})(Button);

export default function LoginButton() {
    return (
        <LButton color="primary" variant="contained">Log In</LButton>
    )
}
