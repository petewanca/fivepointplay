import React from "react";
import { Link } from "react-router-dom";

const styles = {
	logo: {
		maxWidth: 100,
		marginTop: ".5rem",
		marginLeft: "-1rem",
		float: "left"
	}
};

export default function Logo() {
	return (
		<Link to="/">
			<img style={styles.logo} src="./logo.png" alt="5 Point Play Logo" />
		</Link>
	);
}
