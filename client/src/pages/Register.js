import React from 'react';

// Material-UI Components
import Box from '@material-ui/core/Box';

// React Components
import RegisterForm from "../components/RegisterForm";

const styles = {
    box: {
        height: "79vh",
        padding: "0 1rem",
        textAlign: "center",
        backgroundColor: "grey",
        color: "white"
    },
    heading: {
        margin: 0,
        paddingTop: "1rem"
    }
}

export default function Register() {
    return (
        <div>
            <Box style={styles.box}>
                <h1 style={styles.heading}>Register</h1>
                <RegisterForm />
            </Box>
        </div>
    )
}
