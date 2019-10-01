import React, {Component} from 'react';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    textfield : {
        width: "80%",
        marginTop: ".5rem",
    }
}

export default class SearchField extends Component {

    state = {
        search: ""
    };

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    handleSubmitForm = () => {

        console.log(this.state.search)
        
    };

    render() {
        return (
            <div style={styles.textfield}>
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    margin="normal"
                    variant="outlined"/>
                <Button
                    onClick={this.handleSubmitForm}
                    variant="outlined"
                    size="small">Search</Button>
            </div>
        )
    }
}
