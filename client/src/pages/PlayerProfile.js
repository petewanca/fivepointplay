import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

const styles = {
  playerImage: {
    width: "60%",
    borderBottom: "1px solid gray",
    marginBottom: 0,
    paddingBottom: 0
  },
  teamLogo: {
    width: "15%",
    padding: 0,
    margin: 0
  },
  profileText: {
    padding: 0,
    margin: 5,
    fontSize: "1em"
  },
  statText: {
    paddingLeft: "13%",
    margin: 5,
    fontSize: "1em",
    textAlign: "left"
  }
}

export default class PlayerProfile extends Component {
  state = {
    stats: [],
    fantasy: []
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

  componentDidMount = () => {
    console.log("component mounted")
    this.getStats();
    this.getFantasyValue();
  }

  render() {
    const props = this.props.location.state.players;

    return (
      <Grid justify="center" container spacing={3}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <img style={styles.playerImage} src={props.playerImage} alt="profile pic"></img>
        </Grid>
        <Grid item xs={12} md={3} lg={3} xl={3}>
          <img style={styles.teamLogo} src={props.teamLogo} alt="team logo"></img>
          <h1 >{props.playerName}</h1>
          <h2 style={styles.profileText}>{props.position}  |  {props.teamName}</h2>
          <h3 style={styles.profileText}>{props.height} / {props.weight} / {props.age} years old</h3>
          <h1 style={styles.profileText}>Fantasy Points Per Game: {this.state.fantasy.fantasyValue} fppg</h1>
        </Grid>
        <Grid item xs={12} md={3} lg={3} xl={3}>
          <h2 style={styles.profileText}>Last Season's Stats</h2>
          <h5 style={styles.profileText}>*per game averages</h5>
          <br></br>
          <h3 style={styles.statText}>Games played: {this.state.stats.lsGamesPlayed}</h3>
          <h3 style={styles.statText}>Minutes: {this.state.stats.lsMinutesPerGame}</h3>
          <h3 style={styles.statText}>Points: {this.state.stats.lsPointsPerGame}</h3>
          <h3 style={styles.statText}>Rebounds: {this.state.stats.lsRebounds}</h3>
          <h3 style={styles.statText}>Assists: whoops!</h3>
          <h3 style={styles.statText}>Steals: {this.state.stats.lsSteals}</h3>
          <h3 style={styles.statText}>Blocks: {this.state.stats.lsBlocks}</h3>
          <h3 style={styles.statText}>Turnovers: {this.state.stats.lsTurnovers}</h3>
          <h3 style={styles.statText}>Fouls: {this.state.stats.lsFouls}</h3>
          <h3 style={styles.statText}>FG: {this.state.stats.lsFieldGoalPercentage}%</h3>
          <h3 style={styles.statText}>3P: {this.state.stats.lsThreePointPercentage}%</h3>
          <h3 style={styles.statText}>FT: {this.state.stats.lsFreeThrowPercentage}%</h3>
        </Grid>
      </Grid>
    )
  }
}