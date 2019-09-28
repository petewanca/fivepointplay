import React, { Component } from 'react';

// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// React APIs 
import API from "../utils/API";

const styles = {
    button: {
        marginTop: "2rem",
        width: "80%"
    },
    login: {
        width: "80%"
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

    render() {
        return (
            <form noValidate autoComplete="off">
                <div>
                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={styles.login}
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
                    style={styles.login}
                    />
                </div>
                <Button
                    onClick={this.handleSubmitForm}
                    style={styles.button}
                    variant="outlined"
                    size="small">Log In</Button>
            </form>
        )
    }
}
