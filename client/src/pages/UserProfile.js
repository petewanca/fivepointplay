import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// Material-UI Components
import UILink from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// React APIs
import API from "../utils/API";
import axios from 'axios';

export default class UserProfile extends Component {

    styles = {
        avatar: {
            display: "block",
            margin: "0 auto",
            borderRadius: "50%",
            maxWidth: "50%"
        },
        input: {
            width: "80%",
            marginTop: 0
        },
        header: {
            marginTop: 0
        },
        link: {
            margin: ".5rem 0 1rem 0",
            display: "block"
        }
    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: ""
    }

    componentDidMount() {
        var jwt = localStorage.getItem("jwt")
        var userData = JSON.parse(jwt);
        var userId = userData.data.id;
        var token = userData.data.token;
        // Make an API call based on jwt data to get/set user data.
        // Source: https://stackoverflow.com/questions/51586458/how-to-pass-header-jwt-token-with-axios-react
        axios.get(`/api/users/${userId}`,
            { headers: {
                Authorization: `${token}`
            }}).then(res => {
            var { firstName, lastName, email, imageFile} = res.data;
            if (imageFile === undefined) {
                this.setState({
                    avatarUrl: "avatar.png"
                })
            }
            this.setState({
                firstName,
                lastName,
                email,
                avatarUrl: imageFile
            }) 
        }).catch(err => {
            console.log(err);
        })
    }

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    render() {
        return (
            <div>
                <h1 style={this.styles.header}>Hey, {this.state.firstName}</h1>
                <img
                    style={this.styles.avatar}
                    src={this.state.avatarUrl}
                    alt={this.state.name + " profile picture"}/>
                <UILink style={this.styles.link} component={ Link } to="/update-avatar">Update Avatar</UILink>
                <Box>
                    <TextField
                        id="first-name"
                        label="First Name"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={this.styles.input}/>
                    <TextField
                        id="last-name"
                        label="Last Name"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={this.styles.input}/>
                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={this.styles.input}/>
                </Box>
                <UILink style={this.styles.link} component={ Link } to="#">Update Profile Info</UILink>
                <UILink style={this.styles.link} component={ Link } to="/update-password">Update Password</UILink>
            </div>
        )
    }
}
