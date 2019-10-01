import React, {Component} from 'react';
// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const styles = {
    textfield : {
        width: "80%"
    }
}

export default class SearchField extends Component {
  state = {
    playerSearch: "",
    players: []
  }

  // get search field value and set to state
  handleChange = (e) => {
    this.setState({playerSearch: e.target.value})
  };

  // use search field value to call db and
  // hits Players table and sets state to returned players
  handleSubmit = (e) => {
    alert(this.state.playerSearch)
    e.preventDefault();
      axios.get(`/api/findPlayer/${this.state.playerSearch}`, (req, res) => {
      }).then(res => {
        console.log(res.data);
        this.setState({players: res.data})
      }).catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Search a player
            <input 
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            >
            </input>
          </label>
          <input 
            type="submit" 
            value="Submit" 
            style={styles.button}
            variant="outlined"
            size="small"
          />
        </form>

        {
          this.state.players.map(player => (
            <div id={player.id} key={player.playerLink}>
              <h2>{player.playerName}</h2>
              <p>{player.teamName}</p>
              <p>{player.height}</p>
              <p>{player.weight}</p>
              <p>{player.age}</p>
              <img src={player.playerImage} alt="player image"></img>
              <p>{player.position}</p>
              <img src={player.teamLogo} alt="team logo"></img>
            </div>
          ))
        }
      </div>
    )
  }
}
