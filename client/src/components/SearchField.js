import React, {Component} from 'react';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    textfieldBox: {
        marginTop: ".5rem"
    },
    textfield : {
        width: "80%",
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
            <div style={styles.textfieldBox}>
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    margin="normal"
                    variant="outlined"
                    style={styles.textfield}/>
                <Button
                    style={styles.textfield}
                    onClick={this.handleSubmitForm}
                    variant="outlined"
                    size="small">Search</Button>
            </div>
        )
    }
}
