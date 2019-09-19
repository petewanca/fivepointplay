import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
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
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </Container>
    </CssBaseline>
  );
}

export default App;
