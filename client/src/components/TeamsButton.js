import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
    button: {
        width: "80%",
        padding: "13.5px 16px",
    }
}

export default function TeamsButton() {
    return (
        <Button style={styles.button} variant="outlined">
            All Teams
        </Button>
    )
}