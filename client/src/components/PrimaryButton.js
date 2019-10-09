import React from "react";
import { Link } from "react-router-dom";

// Material-UI Components
import Button from "@material-ui/core/Button";

function PrimaryButton(props) {
	return (
		<div>
			<Button
				style={props.style}
				color={props.color}
				component={Link}
				to={props.to}
				variant="contained">
				{props.message}
			</Button>
		</div>
	);
}

export default PrimaryButton;
