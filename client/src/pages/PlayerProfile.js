import React, { Component } from 'react';
import axios from 'axios';

export default class PlayerProfile extends Component {
  state = {
    stats: [],
    fantasy: []
  }

  styles = {
    // paper: {
    //     padding: ".5rem"
    // },
    // image: {
    //     maxWidth: "-webkit-fill-available"
    // }
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
      <div id ={props.id} key={props.playerLink}>
        <img src={props.playerImage} alt="player image"></img>
        <img src={props.teamLogo} alt="team logo"></img>
        <h1>{props.playerName}</h1>
        <h2>{props.teamName}</h2>
        <h3>{props.position}</h3>
        <p>{props.height} / {props.weight} / {props.age} years old</p>

        <h1>Last Season's Stats</h1>
        <h5>*per game averages</h5>
        <table>
          <tr>
            <th>Games</th>
            <th>Minutes</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Turnovers</th>
            <th>Fouls</th>
            <th>FG%</th>
            <th>3P%</th>
            <th>FT%</th>
            <th>Fantasy</th>
          </tr>
          <tr>
            <td>{this.state.stats.lsGamesPlayed}</td>
            <td>{this.state.stats.lsMinutesPerGame}</td>
            <td>{this.state.stats.lsPointsPerGame}</td>
            <td>{this.state.stats.lsRebounds}</td>
            <td>whoops!</td>
            <td>{this.state.stats.lsSteals}</td>
            <td>{this.state.stats.lsBlocks}</td>
            <td>{this.state.stats.lsTurnovers}</td>
            <td>{this.state.stats.lsFouls}</td>
            <td>{this.state.stats.lsFieldGoalPercentage}</td>
            <td>{this.state.stats.lsThreePointPercentage}</td>
            <td>{this.state.stats.lsFreeThrowPercentage}</td>
            <td>{this.state.fantasy.fantasyValue}</td>
          </tr>
        </table>
        
      </div>
    )
  }
}