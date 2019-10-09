import React from "react";

// Material UI Components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
	const [setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={props.open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{props.alertTitle}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{props.alertBody}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={props.handleClose}
						color="primary"
						autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
