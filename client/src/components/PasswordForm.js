import React, { Component } from "react";
import { Redirect } from "react-router";

// import { Link } from 'react-router-dom'; Material-UI Components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// React Components
import PrimaryButton from "../components/PrimaryButton";

// React APIs import API from "../utils/API";
import axios from "axios";

const styles = {
	secButton: {
		marginTop: "1rem",
		float: "right"
	},
	defButton: {
		marginTop: "1rem",
		float: "left"
	},
	input: {
		width: "80%"
	},
	buttonContainer: {
		width: "80%",
		margin: "1rem auto"
	}
};

export default class PasswordForm extends Component {
	state = {
		newPassword: "",
		confirmNewPassword: "",
		redirect: false
	};

	handleInputChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	handleSubmitForm = (event) => {
		event.preventDefault();
		var jwt = localStorage.getItem("jwt");
		var userData = JSON.parse(jwt);
		var userId = userData.data.id;
		var token = userData.data.token;
		var data = {
			passwordNew: this.state.newPassword,
			passwordVerify: this.state.confirmNewPassword
		};
		axios
			.put(`/api/users/password/${userId}`, data, {
				headers: {
					Authorization: `${token}`
				}
			})
			.then((res) => {
				this.setState({ redirect: true });
			})
			.catch((err) => {
				this.setState({ newPassword: "", confirmNewPassword: "" });
			});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/profile" />;
		}

		return (
			<form
				onSubmit={this.handleSubmitForm}
				noValidate
				autoComplete="off">
				<TextField
					id="newPassword"
					label="New Password"
					type="password"
					name="newPassword"
					onChange={this.handleInputChange}
					margin="normal"
					style={styles.input}
				/>
				<TextField
					id="confirmNewPassword"
					label="Confirm Password"
					type="password"
					name="confirmNewPassword"
					onChange={this.handleInputChange}
					margin="normal"
					style={styles.input}
				/>
				<div style={styles.buttonContainer}>
					<Button
						variant="contained"
						color="secondary"
						style={styles.secButton}
						onClick={this.handleSubmitForm}
						type="submit">
						Update
					</Button>
					<PrimaryButton
						color={"default"}
						style={styles.defButton}
						to={"/profile"}
						message={"Cancel"}
					/>
				</div>
			</form>
		);
	}
}
