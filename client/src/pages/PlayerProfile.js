import React, { Component } from 'react';
import axios from 'axios';

export default class PlayerProfile extends Component {
state = {
  stats: []
}
  componentDidMount = () => {
    console.log("component mounted")
    
    axios.post(`/api/stats/`, {
      playerName: this.props.location.state.players.playerName,
      team: this.props.location.state.players.teamName
    }).then(res => {
      console.log(res.data);
      this.setState({stats: res.data})
    }).catch(err => console.log(err));
  }

  render() {
    const props = this.props.location.state.players;

    return (
      <div id ={props.id} key={props.playerLink}>
        <img src={props.teamLogo} alt="team logo"></img>
        <h1>{props.playerName}</h1>
        <p>{props.playerName}</p>
        <h2>{props.teamName}</h2>
        <h2>{props.playerName}</h2>
        <h3>{props.position}</h3>
        <p>{props.height} / {props.weight} / {props.age} years old</p>
        <img src={props.playerImage} alt="player image"></img>
      </div>
    )
  }
}


