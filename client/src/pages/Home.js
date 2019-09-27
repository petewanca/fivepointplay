import React from 'react';

// Material-UI Components
import Box from '@material-ui/core/Box';

// React Components
import TeamsButton from "../components/TeamsButton";
import SearchField from "../components/SearchField"


const styles = {
    box: {
        paddingTop: "10rem"
    }
}

export default function Home() {
    return (
        <div>
            <Box style={styles.box}>
                <TeamsButton />
                <SearchField />
            </Box>
        </div>
    )
}
