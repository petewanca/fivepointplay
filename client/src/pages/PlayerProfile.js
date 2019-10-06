import React, {Component} from 'react';
import axios from 'axios';

// Material-UI Components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// React Components
import Alert from "../components/Alert";

const styles = {
    playerImage: {
        maxWidth: "40%",
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
    },
    container: {
        width: "100%",
        margin: 0
    }
}

export default class PlayerProfile extends Component {
    state = {
        stats: [],
        fantasy: [],
        alertShow: false,
        alertTitle: "",
        alertBody: ""
    }

    handleClose = () => {
        this.setState({alertShow: false})
    };

    saveToList = () => {
        if (localStorage.jwt === undefined) {
            this.setState({alertTitle: "Error", alertBody: "You must log in to use this functionality.", alertShow: true});
        } else {
            let jwt = localStorage.getItem("jwt")
            let userData = JSON.parse(jwt);
            let userId = userData.data.id;
            axios
                .post(`/api/add-to-list`, {
                playerName: this.props.location.state.players.playerName,
                teamName: this.props.location.state.players.teamName,
                userId: userId
            })
                .then(res => {
                    // alert('Player saved to list.')
                    this.setState({alertTitle: "Save Successful", alertBody: "Player saved to list.", alertShow: true});
                })
                .catch(err => console.log(err));
        }
    }

    getStats = () => {
        axios
            .post(`/api/stats/`, {
            playerName: this.props.location.state.players.playerName,
            team: this.props.location.state.players.teamName
        })
            .then(res => {
                this.setState({stats: res.data})
            })
            .catch(err => console.log(err));
    }

    getFantasyValue = () => {
        axios
            .post(`/api/player/fantasyCalculator/`, {
            type: "standard",
            playerName: this.props.location.state.players.playerName,
            team: this.props.location.state.players.teamName
        })
            .then(res => {
                this.setState({fantasy: res.data})
            })
            .catch(err => console.log(err));
    }

    componentDidMount = () => {
        this.getStats();
        this.getFantasyValue();
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

        return (
            <div>

                <Grid style={styles.container} justify="center" container spacing={3}>

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
                                        <TableCell align="right">N/A</TableCell>
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
                <Alert
                    alertTitle={this.state.alertTitle}
                    handleClose={this.handleClose}
                    open={this.state.alertShow}
                    alertBody={this.state.alertBody}/>
            </div>
        )
    }
}