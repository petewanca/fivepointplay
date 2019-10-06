import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Link} from 'react-router-dom';

// Custom fonts
import "./index.css"

// React Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateAvatar from "./pages/UpdateAvatar";
import AllTeams from "./pages/AllTeams";
import Team from "./pages/Team";
import Results from "./pages/Results";
import PlayerProfile from "./pages/PlayerProfile";
import Error404 from "./pages/Error404";

// React Component
import Logo from "./components/Logo";
import LoginButton from "./components/LoginButton";

// Material-UI Component
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

import axios from 'axios';

const styles = {
    container: {
        width: "80%",
        margin: "0 auto",
        paddingTop: "17vh"
      },
    wrapper: {
        padding: "0 1rem",
        textAlign: "center"
    },
    priButton: {
        margin: "1rem 0 0 1rem",
        float: "right"
    }
};

const theme = createMuiTheme({
    overrides: {
        MuiInput: {
            underline: {
                '&:hover:not($disabled):before': {
                    borderBottom: '1px solid #F87C00',
                }
            }
        }
    },
    palette: {
        background: {
            default: "#FFF"
        },
        primary: {
            light: "#F88717",
            main: "#F87C00",
            dark: "#E27100",
            contrastText: '#fff'
        },
        secondary: {
            light: "#2EC9F8",
            main: "#00BDF7",
            dark: "#009BCB",
            contrastText: '#fff'
        },
        error: {
            light: "#F92E2E",
            main: "#F80000",
            dark: "#CB0000",
            contrastText: '#fff'
        }
    },
    typography: {
        fontFamily: ['Antonio'].join(','),
        fontWeightLight: 300,
        fontWeightRegular: 500,
        fontWeightMedium: 700,
        fontSize: 16
    }
});

export default class App extends Component {

    state = {
        isLoggedIn: false
    }

    handleIsLoggedIn = () => {
        var token = localStorage.getItem('jwt');
        if (token !== undefined) {
            this.setState({isLoggedIn: true})
        } else {
            this.setState({isLoggedIn: false})
        }
    }

    handleLogout = () => {
        var jwt = localStorage.getItem("jwt");
        var userData = JSON.parse(jwt);
        var token = userData.data.token;
        axios
            .get("/api/auth/logout", {
            headers: {
                Authorization: `${token}`
            }
        })
            .then(res => {
                localStorage.removeItem("jwt");
                this.setState({isLoggedIn: false})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <Box style={styles.wrapper}>
                        <Router>
                            <Box>
                                <Logo/> {this.state.isLoggedIn
                                    ? (
                                        <div>
                                            <Button
                                                onClick={this.handleLogout}
                                                color="default"
                                                style={styles.priButton}
                                                variant="outlined">Log Out</Button>
                                            <Button
                                                color="default"
                                                component={Link}
                                                to="profile"
                                                style={styles.priButton}
                                                variant="outlined">
                                                Profile
                                            </Button>
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <LoginButton
                                                to={"/login"}
                                                color={"primary"}
                                                style={styles.priButton}
                                                message={"Log In"}/>
                                        </div>
                                    )}
                                <Button
                                    color="primary"
                                    component={Link}
                                    to="/"
                                    style={styles.priButton}
                                    variant="contained">
                                    Search
                                </Button>
                            </Box>
                            <Box style={styles.container}>
                            <Switch>
                                <Route exact path="/register" component={Register}/>
                                <Route
                                    exact
                                    path="/login"
                                    component={() => <Login handleIsLoggedIn={this.handleIsLoggedIn}/>}/>
                                <Route exact path="/profile" component={UserProfile}/>
                                <Route exact path="/update-password" component={UpdatePassword}/>
                                <Route exact path="/update-avatar" component={UpdateAvatar}/>
                                <Route exact path="/all-teams" component={AllTeams}/>
                                <Route exact path="/team" component={Team}/>
                                <Route exact path="/results" component={Results}/>
                                <Route exact path="/player-profile" component={PlayerProfile}/>
                                <Route exact path="/" component={Home}/>
                                <Route component={Error404}/>
                            </Switch>
                            </Box>
                        </Router>
                    </Box>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}
