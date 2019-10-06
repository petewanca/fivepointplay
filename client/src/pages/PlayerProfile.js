import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  playerImage: {
    width: "50%",
    borderBottom: "1px solid gray",
    marginBottom: 0,
    paddingBottom: 0
  },
  teamLogo: {
    maxWidth: "13%",
    padding: 0,
    margin: 0
  },
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: "10%"
  },
  link: {
    textDecoration: 'none'
  }
}

export default class PlayerProfile extends Component {
  state = {
    stats: [],
    fantasy: [],
    profile: []
  }
  
  saveToList = () => {
    let jwt = localStorage.getItem("jwt")
    let userData = JSON.parse(jwt);
    let userId = userData.data.id;
    let token = userData.data.token;
    console.log(userId)

    if (userId) {
    axios
      .post(`/api/add-to-list`, {
        playerName: this.props.location.state.players.playerName,
        teamName: this.props.location.state.players.teamName,
        userId: userId
      })
      .then(res => {
        alert('Player saved to list.')
        console.log(res)
      })
      .catch(err => console.log(err));
    } else {
      alert('You must log in to use this functionality.')
    }
  }

  getStats = () => {
    axios.post(`/api/stats/`, {
      playerName: this.props.location.state.players.playerName,
      team: this.props.location.state.players.teamName
    }).then(res => {
      console.log(res.data);
      this.setState({stats: res.data})
    }).catch(err => console.log(err));
  }

  getFantasyValue = () => {
    axios.post(`/api/player/fantasyCalculator/`, {
      type: "standard",
      playerName: this.props.location.state.players.playerName,
      team: this.props.location.state.players.teamName
    }).then(res => {
      console.log(`fantasy calc: ${res.data}`)
      this.setState({fantasy: res.data})
    }).catch(err => console.log(err));
  }

  getProfileInfo = () => {
    axios.post("/api/player-profile/", {
      playerName: this.props.location.state.players.playerName,
      teamName: this.props.location.state.players.teamName
    }).then(res => {
      this.setState({
        profile: res.data
      })
    }).catch(err => console.log(err))
  }

  componentDidMount = () => {
    console.log("component mounted")
    this.getStats();
    this.getFantasyValue();
    this.getProfileInfo();
  }

  render() {
    const props = this.props.location.state.players;

    return (

      <Grid justify="center" container spacing={3}>
        
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} md={2} lg={2} xl={2}>
            <Button 
              color="default"
              styles={styles.priButton}
              variant="outlined"
              onClick={this.saveToList}>
                ADD TO LIST
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} md={9} lg={9} xl={9}>
          <img style={styles.playerImage} src={this.state.profile.playerImage} alt="profile pic"></img>
          {/* <img style={styles.teamLogo} src={props.teamLogo} alt="team logo"></img>           */}
          <h1 >{this.state.profile.playerName}</h1>
        </Grid>

        {/* Gen Info Table */}
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Paper style={styles.root}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>General Info</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Team
                  </TableCell>
                  <TableCell align="right">{this.state.profile.teamName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Position
                  </TableCell>
                  <TableCell align="right">{this.state.profile.position}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Height
                  </TableCell>
                  <TableCell align="right">{this.state.profile.height}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Weight
                  </TableCell>
                  <TableCell align="right">{this.state.profile.weight}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Age
                  </TableCell>
                  <TableCell align="right">{this.state.profile.age}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Stats Table */}
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Paper style={styles.root}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Last Season's Stats (per game)</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Fantasy Points
                  </TableCell>
                  <TableCell align="right">{this.state.fantasy.fantasyValue}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Games Played
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsGamesPlayed}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Minutes
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsMinutesPerGame}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Points
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsPointsPerGame}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Rebounds
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsRebounds}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Assists
                  </TableCell>
                  <TableCell align="right">Whoops!</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Blocks
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsBlocks}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Steals
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsSteals}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Turnovers
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsTurnovers}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      Fouls
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsFouls}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      FG%
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsFieldGoalPercentage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      3P%
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsThreePointPercentage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                      FT%
                  </TableCell>
                  <TableCell align="right">{this.state.stats.lsFreeThrowPercentage}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

      </Grid>
    )
  }
}