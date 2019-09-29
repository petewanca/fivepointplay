import React, { Component } from 'react';

// Material-UI Components
import TextField from '@material-ui/core/TextField';

// React Components
import SecondaryButton from "../components/SecondaryButton";
import DefaultButton from "../components/DefaultButton";

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

export default class PasswordForm extends Component {

    state = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
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
                    id="currentPassword"
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={this.state.currentPassword}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={styles.input}
                />
                <TextField
                    id="newPassword"
                    label="New Password"
                    type="password"
                    name="newPassword"
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={styles.input}
                    />
                    <TextField
                    id="confirmNewPassword"
                    label="Confirm Password"
                    type="password"
                    name="confirmNewPassword"
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={styles.input}
                    />
                <SecondaryButton style={styles.secButton} message={"Update"} />
                <DefaultButton style={styles.defButton} href="/profile" message={"Cancel"} />
            </form>
        )
    }
}
