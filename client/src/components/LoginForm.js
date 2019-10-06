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
    priButton: {
        marginTop: "1rem",
        marginLeft: "1rem",
        float: "right"
    },
    defButton: {
        marginTop: "1rem",
        float: "left"
    },
    login: {
        width: "80%",
    },
    buttonContainer: {
        width: "80%",
        margin: "1rem auto",
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

    handleSubmitForm = event => {
        event.preventDefault();
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
                <form onSubmit={this.handleSubmitForm}>
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
                    <div style={styles.buttonContainer}>
                    <Button
                        onClick={this.handleSubmitForm}
                        style={styles.priButton}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        >Log In</Button>
                    <Button
                        component={ Link }
                        to={"/register"}
                        color="primary"
                        style={styles.priButton}
                        variant={"contained"}
                        message={"Log In"}>Register</Button>
                    <Button
                        component={Link}
                        to={"/"}
                        color={"default"}
                        variant="contained"
                        style={styles.defButton}
                        >Cancel</Button>
                    </div>
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
