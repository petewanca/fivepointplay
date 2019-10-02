import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

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
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
// import API from './utils/API';

const styles = {
    header: {
        width: "100vw",
        height: "21vh",
        padding: "0 1rem"
    },
    wrapper: {
        padding: "0 1rem",
        textAlign: "center"
    },
    priButton: {
        marginTop: "1rem",
        float: "right"
    }
};

const theme = createMuiTheme({
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
        console.log("token", token)
        if (token !== undefined) {
            console.log("true")
            this.setState({
                isLoggedIn: true
            })
        } else {
            this.setState({isLoggedIn: false})
        }
    }

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <Box style={styles.header}>
                        <Logo/>
                        {this.state.isLoggedIn
                            ? (<LoginButton
                                href={"#"}
                                color={"default"}
                                style={styles.priButton}
                                message={"Log Out"}
                                />)
                            : (<LoginButton
                                href={"/login"}
                                color={"primary"}
                                style={styles.priButton}
                                message={"Log In"}/>)
                        }                       
                    </Box>
                    <Box style={styles.wrapper}>
                        <Router>
                            <Switch>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/login" component={() => <Login handleIsLoggedIn={this.handleIsLoggedIn} />} />
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
                        </Router>
                    </Box>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}
