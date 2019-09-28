import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

const styles = {
    textfield : {
        width: "80%"
    }
}

export default class SearchField extends Component {
    render() {
        return (
            <div>
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    style={styles.textfield}
                    margin="normal"
                    variant="outlined"/>
            </div>
        )
    }
}
