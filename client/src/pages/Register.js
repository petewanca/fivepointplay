import React from 'react';

// React Components
import RegisterForm from "../components/RegisterForm";

const styles = {
    heading: {
        margin: 0
    }
}

export default function Register() {
    return (
        <div>
            <h1 style={styles.heading}>Register</h1>
            <RegisterForm/>
        </div>
    )
}
