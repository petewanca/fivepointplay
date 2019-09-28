import React from 'react';

const styles = {
    logo: {
        maxWidth: 100,
        marginTop: ".5rem",
        marginLeft: "-1rem",
        float: "left"
    }
}

export default function Logo() {
    return (
        <img style={styles.logo} src="./logo.png" alt="5 Point Play Logo" />
    )
}
