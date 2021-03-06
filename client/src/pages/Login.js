import React from "react";

// React Components
import LoginForm from "../components/LoginForm";

const styles = {
	heading: {
		margin: 0,
		paddingTop: "1rem"
	}
};

export default function Login(props) {
	return (
		<div>
			<h1 style={styles.heading}>Login</h1>
			<LoginForm handleIsLoggedIn={props.handleIsLoggedIn} />
		</div>
	);
}
