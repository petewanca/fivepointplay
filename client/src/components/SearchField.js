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
    playerSearch: ""
  }

  // get search field value
  handleChange = (e) => {
    this.setState({playerSearch: e.target.value})
  };

  // use search field value to call db
  handleSubmit = (e) => {
    alert(this.state.playerSearch)
    e.preventDefault();
      axios.get(`/api/findPlayer/${this.state.playerSearch}`, (req, res) => {
      }).then(res => {
          console.log(res);
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
            {/* <TextField
              id="outlined-search"
              label="Search field"
              type="text"
              style={styles.textfield}
              margin="normal"
              variant="outlined"
              name="search"
            /> */}
          </label>
          <input 
            type="submit" 
            value="Submit" 
            style={styles.button}
            variant="outlined"
            size="small"
          />
        </form>
      </div>
    )
  }
}
