import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Material-UI Components
import UILink from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// React Components
import Alert from "../components/Alert";

// React APIs
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
        shownName: "",
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: "",
        alertShow: false
    }

    componentDidMount() {
        var jwt = localStorage.getItem("jwt");
        var userData = JSON.parse(jwt);
        var userId = userData.data.id;
        var token = userData.data.token;
        axios
            .get(`/api/users/${userId}`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then(res => {
                var {firstName, lastName, email, imageFile} = res.data;
                if (res.data.imageFile === "" || res.data.imageFile === undefined) {
                    this.setState({shownName: firstName, firstName, lastName, email, avatarUrl: "avatar.png"})
                } else {
                    this.setState({shownName: firstName, firstName, lastName, email, avatarUrl: imageFile})
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    handleSubmitForm = () => {
        var jwt = localStorage.getItem("jwt")
        var userData = JSON.parse(jwt);
        var userId = userData.data.id;
        var token = userData.data.token;
        axios.put(`/api/users/${userId}`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }, {
            headers: {
                Authorization: `${token}`
            }
        }).then(res => {
            var {firstName, lastName, email} = res.data;
            this.setState({shownName: firstName, firstName, lastName, email, alertShow: true})
        }).catch(err => {
            console.log(err)
        })
    };

    handleClose = () => {
        this.setState({alertShow: false})
    }

    render() {
        return (
            <div>
                <h1 style={this.styles.header}>Hey, {this.state.shownName}</h1>
                <img
                    style={this.styles.avatar}
                    src={this.state.avatarUrl}
                    alt={this.state.name + " profile picture"}/>
                <UILink style={this.styles.link} component={Link} to="/update-avatar">Update Avatar</UILink>
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
                <UILink style={this.styles.link} onClick={this.handleSubmitForm}>Update Profile Info</UILink>
                <UILink style={this.styles.link} component={Link} to="/update-password">Update Password</UILink>
                <Alert
                    alertTitle={"Update Successful"}
                    handleClose={this.handleClose}
                    open={this.state.alertShow}
                    alertBody={"Your user profile was updated successfully."}/>
            </div>
        )
    }
}
