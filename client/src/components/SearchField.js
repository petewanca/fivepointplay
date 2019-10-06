import React, {Component} from 'react';
import { Link }  from 'react-router-dom';
// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

const styles = {
    search : {
      margin: "1rem 0",
      padding: "18.5px 14px",
      lineHeight: "1.25rem"
    },
    searchButton : {
      float: "right",
      marginTop: '1rem'
    },
    playerImage: {
      width: "100%",
      borderBottom: "1px solid gray"
    },
    teamLogo: {
      width: "15%"
    },
    card: {
      maxWidth: "100%",
      align: "center"
    },
    media: {
      height: 140,
    },
    cardContainer: {
      textDecoration: "none",
    }
};

export default class SearchField extends Component {
  state = {
    playerSearch: "",
    players: []
  }

  // get search field value and set to state
  handleChange = event => {
    this.setState({playerSearch: event.target.value})
  };

  // use search field value to call db and
  // hits Players table and sets state to returned players
  handleSubmit = event => {
    event.preventDefault();
      axios.get(`/api/findPlayer/${this.state.playerSearch}`, (req, res) => {
      }).then(res => {
        this.setState({players: res.data})
      }).catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Button
                fullWidth
                style={styles.search}
                size="large"
                variant="outlined"
                component={ Link }
                to="/all-teams"
                >All Teams</Button>
          <TextField
              fullWidth
              id="search"
              label="Player Search"
              name="search"
              variant="outlined"
              value={this.state.searchField}
              onChange={this.handleChange}/>
          <Button
              style={styles.searchButton}
              size="large"
              color="secondary"
              variant="contained"
              onClick={this.handleSubmit}
              >Search</Button>
        </form>

        {/* search results area for players */}
        <Grid container justify="center" spacing={3}>
        { 
          this.state.players.map(player => (
            <Grid item xs={12} md={4} lg={4} xl={4}>
            <Card style={styles.card}>
              <CardActionArea>
              <Link style={styles.cardContainer} to={{
              pathname: '/player-profile',
                state: {
                  players: player
                }
              }}>
                <CardMedia
                  image={player.playerImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <img src={player.playerImage} alt={player.playerName} style={styles.playerImage}></img>
                  <Typography gutterBottom variant="h5" component="h2">
                    <img style={styles.teamLogo} src={player.teamLogo} alt={player.teamName}></img>
                    {player.playerName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {player.position}  |  {player.teamName}
                  </Typography>
                </CardContent>
                </Link>
              </CardActionArea>
            </Card>
            </Grid>
          ))
        }
        </Grid>
      </div>
    )
  }
}
