import React, {Component} from 'react';

// Material-UI Components
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default class UserProfile extends Component {

    styles = {
        profilePic: {
            display: "block",
            margin: "0 auto",
            borderRadius: "50%"
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
        firstName: "Terrence",
        lastName: "Mahnken",
        email: "terrencemm2@gmail.com",
        profilePic: "https://secure.gravatar.com/avatar/166d6e82c51dc3e46ef6841e9f24ab70?s=150"
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
                    style={this.styles.profilePic}
                    src={this.state.profilePic}
                    alt={this.state.name + " profile picture"}/>
                <Link style={this.styles.link} href="/update-avatar">Update Avatar</Link>
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
                <Link style={this.styles.link} href="#">Update Profile Info</Link>
                <Link style={this.styles.link} href="/update-password">Update Password</Link>
            </div>
        )
    }
}
