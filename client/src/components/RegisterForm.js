import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// MaterialUI Components
import TextField from '@material-ui/core/TextField';

// React Components
import PrimaryButton from "../components/PrimaryButton";

// React APIs
import API from "../utils/API";

export default class RegisterForm extends Component {

    styles = {
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
        register: {
            width: "80%"
        }
    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    handleSubmitForm = () => {
        let newSignup = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        API
            .signup(newSignup)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    id="first-name"
                    label="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}/>
                <TextField
                    id="last-name"
                    label="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}/>
                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}/>
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}/>
                <PrimaryButton
                    color={"secondary"}
                    style={this.styles.secButton}
                    message={"Register"}/>
                <PrimaryButton
                    component={Link}
                    to={"/login"}
                    color={"default"}
                    style={this.styles.defButton}
                    message={"Cancel"}/>
            </form>
        )
    }
}
