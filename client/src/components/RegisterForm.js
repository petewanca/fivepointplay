import React, { Component } from 'react';

// MaterialUI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// React APIs 
import API from "../utils/API";

const styles = {
    button: {
        marginTop: "1rem"
    }
}

export default class RegisterForm extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    handleInputChange = event => {
		const { name, value } = event.target;
	
		this.setState({
			[name]: value
		});
    };

    handleSubmitForm = () => {
        let newSignup = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            password : this.state.password
        }
        API.signup(newSignup).then(res => console.log(res)).catch(err => console.log(err));
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <div>
                <TextField
                    id="first-name"
                    label="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                    margin="normal"
                />
                </div>
                <div>
                <TextField
                    id="last-name"
                    label="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                    margin="normal"
                />
                </div>
                <div>
                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    margin="normal"
                />
                </div>
                <div>
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    margin="normal"
                    />
                </div>
                <Button
                    onClick={this.handleSubmitForm}
                    style={styles.button}
                    variant="outlined"
                    size="small">Sign Up</Button>
            </form>
        )
    }
}
