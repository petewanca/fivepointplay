import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// Redirect Source:
// https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-re
// act-router-dom-of-reactjs
import {Redirect} from 'react-router';

// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// React APIs
import API from "../utils/API";

// React Components
import Alert from "../components/Alert";

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
        redirect: false,
        alertShow: false,
        alertTitle: "",
        alertBody: ""
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
                this.setState({redirect: true})
                this
                    .props
                    .handleIsLoggedIn();
            })
            .catch(err => {
                this.setState({email: "", password: "", alertTitle: err.response.data.msgTitle, alertBody: err.response.data.msgBody, alertShow: true})
            });
    };

    handleClose = () => {
        this.setState({alertShow: false})
    };

    render() {

        if (this.state.redirect) {
            return <Redirect to='/profile'/>;
        }

        return (
            <div>
                <form noValidate autoComplete="off">
                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.login}/>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.login}/>
                    <Button
                        onClick={this.handleSubmitForm}
                        style={styles.button}
                        variant="outlined"
                        size="small">Log In</Button>
                    <Button
                        component={ Link }
                        to={"/register"}
                        style={styles.button}
                        variant={"outlined"}
                        message={"Log In"}>Register</Button>
                </form>
                <Alert
                    alertTitle={this.state.alertTitle}
                    handleClose={this.handleClose}
                    open={this.state.alertShow}
                    alertBody={this.state.alertBody}/>
            </div>
        )
    }
}
