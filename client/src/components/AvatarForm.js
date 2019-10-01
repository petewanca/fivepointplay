import React, { Component } from 'react';

// Material-UI Components
import TextField from '@material-ui/core/TextField';

// React Components
import PrimaryButton from "./PrimaryButton";

// React APIs 
// import API from "../utils/API";

const styles = {
    secButton: {
        marginTop: "1rem",
        marginRight: "1.7rem",
        float: "right"
    },
    defButton: {
        marginTop: "1rem",
        marginLeft: "1.7rem",
        float: "left"
    },
    input: {
        width: "80%"
    }
}

export default class AvatarForm extends Component {

    state = {
        email: ""
    };

    handleInputChange = event => {
		const { name, value } = event.target;
	
		this.setState({
			[name]: value
		});
    };

    handleSubmitForm = () => {
        // let newLogin = {
        //     email : this.state.email,
        //     password : this.state.password
        // }
        // API.login(newLogin).then(res => console.log(res)).catch(err => console.log(err));
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    id="email"
                    label="Gravatar Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={styles.input}
                />
                <PrimaryButton color={"secondary"} style={styles.secButton} message={"Update"} />
                <PrimaryButton color={"default"} href="/profile" style={styles.defButton} message={"Cancel"} />
            </form>
        )
    }
}
