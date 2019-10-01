import React, { Component } from 'react';

// Redirect
// Source: https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs
import { Redirect } from 'react-router';

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
        password: "",
        redirect: false
    };

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    handleSubmitForm = () => {

        let newLogin = {
            email: this.state.email,
            password: this.state.password
        }
        API
            .login(newLogin)
            .then(res => {
                var result = JSON.stringify(res);
                localStorage.setItem("jwt", result);
                this.setState({
                    redirect: true
                })
                this.props.handleIsLoggedIn();
            })
            .catch(err => console.log(err));
        
    };

    render() {

        if (this.state.redirect) {
            return <Redirect to='/profile'/>;
        }

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
                        style={styles.login}/>
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.login}/>
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
