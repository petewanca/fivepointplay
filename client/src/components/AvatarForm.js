import React, { Component } from 'react';

// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// React Components
import PrimaryButton from "./PrimaryButton";

// React APIs 
import axios from 'axios';
// import API from "../utils/API";

const styles = {
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
    input: {
        width: "80%"
    }
}

export default class AvatarForm extends Component {

    state = {
        email: "",
        redirect: false
    };

    handleInputChange = event => {
		const { name, value } = event.target;
	
		this.setState({
			[name]: value
		});
    };

    handleSubmitForm = () => {
        var jwt = localStorage.getItem("jwt")
        var userData = JSON.parse(jwt);
        var userId = userData.data.id;
        var token = userData.data.token;
        var data = this.state.avatarEmail
        axios.put(`/api/users/avatar/${userId}`, data, {
            headers: {
                Authorization: `${token}`,     
            }}).then(res => {
                this.setState({
                    redirect: true
                })
            }).catch(err => {
                console.log(err)
            }) 
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    id="email"
                    label="Gravatar Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={styles.input}
                />
                <Button variant="contained" color="secondary" style={styles.secButton} onClick={this.handleSubmitForm}>Update</Button>
                <PrimaryButton color={"default"} href="/profile" style={styles.defButton} message={"Cancel"} />
            </form>
        )
    }
}
