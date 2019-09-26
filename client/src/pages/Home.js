import React from 'react'

const styles = {
    logo: {
        width: "50%",
        display: "block",
        margin: "0 auto"
    }
}

export default function Home() {
    return (
        <div>
            <img style={styles.logo} src="./logo.png" alt="5 Point Play Logo" />
        </div>
    )
}
