import React, { Component } from "react";
import { Redirect } from "react-router";

// Material-UI Components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// React Components
import PrimaryButton from "./PrimaryButton";

// React APIs
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
		overflow: "auto",
		margin: "0 auto"
	}
};

export default class AvatarForm extends Component {
	state = {
		email: "",
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
		axios
			.put(
				`/api/users/avatar/${userId}`,
				{
					email: this.state.email
				},
				{
					headers: {
						Authorization: `${token}`
					}
				}
			)
			.then((res) => {
				this.setState({ redirect: true });
			})
			.catch((err) => {
				console.log(err);
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
					id="email"
					label="Gravatar Email"
					name="email"
					value={this.state.email}
					onChange={this.handleInputChange}
					margin="normal"
					style={styles.input}
				/>
				<div style={styles.buttonContainer}>
					<Button
						variant="contained"
						color="secondary"
						style={styles.secButton}
						type="submit"
						onClick={this.handleSubmitForm}>
						Update
					</Button>
					<PrimaryButton
						color={"default"}
						to="/profile"
						style={styles.defButton}
						message={"Cancel"}
					/>
				</div>
			</form>
		);
	}
}
