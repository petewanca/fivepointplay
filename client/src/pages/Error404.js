import React from 'react';

// Material-UI Components
import Box from '@material-ui/core/Box';

const styles = {
    box: {
        height: "79vh",
        padding: "0 1rem",
        textAlign: "center",
    },
    image: {
        width: "100%"
    }
}

export default function Error404() {
    return (
        <div>
            <Box style={styles.box}>
                <h1>404</h1>
                <img style={styles.image} src="https://i.giphy.com/media/3oAt2dA6LxMkRrGc0g/giphy.webp" alt="James Harden 404" />
            </Box>

        </div>
        
    )
}
