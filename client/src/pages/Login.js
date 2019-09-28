import React from 'react';

// Material-UI Components
import Box from '@material-ui/core/Box';

// React Components
import LoginForm from "../components/LoginForm";

const styles = {
    box: {
        height: "79vh",
        padding: "0 1rem",
        textAlign: "center"
    },
    heading: {
        margin: 0,
        paddingTop: "1rem"
    }
}

export default function Login() {
    return (
        <div>
            <Box style={styles.box}>
                <h1 style={styles.heading}>Login</h1>
                <LoginForm />
            </Box>
        </div>
    )
}
