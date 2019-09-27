import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

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

import Container from '@material-ui/core/Container';

const styles = {
  container: {
    textAlign: "center"
  }
}

function App() {
  return (
    <CssBaseline>
      <Container style={styles.container}>
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
  );
}

export default App;
