import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = {
	button: {
		width: "80%"
	}
};

export default function TeamsButton() {
	return (
		<Link to="/all-teams" style={{ textDecoration: "none" }}>
			<Button style={styles.button} variant="outlined">
				All Teams
			</Button>
		</Link>
	);
}
