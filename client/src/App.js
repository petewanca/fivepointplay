import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./index.css"

// React Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
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

import Container from '@material-ui/core/Container';

const styles = {
  container: {
    textAlign: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#FFF"
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
      contrastText: '#fff',
    }
  },
  typography: {
    fontFamily: [
      'Antonio'
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontSize: 16
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <CssBaseline>
      <Container style={styles.container}>
        <Logo />
        <LoginButton />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/update-password" component={UpdatePassword} />
            <Route exact path="/update-avatar" component={UpdateAvatar} />
            <Route exact path="/all-teams" component={AllTeams} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/player-profile" component={PlayerProfile} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </Container>
    </CssBaseline>
    </MuiThemeProvider>
  );
}

export default App;
