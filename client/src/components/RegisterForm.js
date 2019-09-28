import React, { Component } from 'react';

// MaterialUI Components
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

// React Components
import SecondaryButton from "../components/SecondaryButton";
import DefaultButton from "../components/DefaultButton";

// React APIs 
import API from "../utils/API";

const CssTextField = withStyles({
    root: {
    "& label.MuiInputLabel-formControl": {
            color: "white"
        },
      '& label.Mui-focused': {
        color: 'orange',
      },
      "& .MuiInput-underline:before": {
        borderColor: "white"  
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'orange',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);

export default class RegisterForm extends Component {

    styles = {
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
        register: {
            width: "80%",
            fontColor: "white"
        }
    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    handleInputChange = event => {
		const { name, value } = event.target;
	
		this.setState({
			[name]: value
		});
    };

    handleSubmitForm = () => {
        let newSignup = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            password : this.state.password
        }
        API.signup(newSignup).then(res => console.log(res)).catch(err => console.log(err));
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <div>
                <CssTextField
                    id="first-name"
                    label="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}
                />
                </div>
                <div>
                <CssTextField
                    id="last-name"
                    label="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}
                />
                </div>
                <div>
                <CssTextField
                    id="email"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}
                />
                </div>
                <div>
                <CssTextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    margin="normal"
                    style={this.styles.register}
                    />
                </div>
                {/* <Button
                    onClick={this.handleSubmitForm}
                    style={styles.button}
                    variant="outlined"
                    size="small">Sign Up</Button> */}
                <SecondaryButton style={this.styles.secButton} message={"Register"} />
                <DefaultButton style={this.styles.defButton} message={"Cancel"} />
            </form>
        )
    }
}
