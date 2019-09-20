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

export default class LoginForm extends Component {

    state = {
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
        let newLogin = {
            email : this.state.email,
            password : this.state.password
        }
        API.login(newLogin).then(res => console.log(res)).catch(err => console.log(err));
    };

    handleGoogleLogin = () => {
        fetch("/api/auth/google", {mode: 'no-cors'});
    }

    render() {
        return (
            <div>
            <form noValidate autoComplete="off">
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
                    size="small">Login</Button>
            </form>
            <div>
                {/* <Button
                 onClick={this.handleGoogleLogin}
                 style={styles.button}
                variant="outlined"
                size="small">Sign In with Google</Button> */}
                <a type="button" className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-sizeSmall" href="/api/auth/google">Sign in with Google</a>
            </div>
            </div>
        )
    }
}
