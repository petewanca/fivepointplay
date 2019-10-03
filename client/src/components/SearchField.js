import React, {Component} from 'react';
import { Link }  from 'react-router-dom';
// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


import axios from 'axios';

const styles = {
    textfieldBox: {
        marginTop: ".5rem"
    },
    textfield : {
        width: "30%",
    },
    profileButton: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
    searchButton: {
      width: "10%",
      padding: "13.5px 16px",
      margin: "20px 0 0 5px"
    },
    playerImage: {
      height: "160px",
      width: "220px"
    },
    teamLogo: {
      width: "15%"
    },
    card: {
      maxWidth: "30%",
    },
    media: {
      height: 140,
    },
    cardContainer: {
      textDecoration: "none"
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
          <TextField
              id="search"
              label="search a player"
              name="search"
              value={this.state.playerSearch}
              onChange={this.handleChange}
              margin="normal"
              style={styles.textfield}/>
          <Button
              style={styles.searchButton}
              variant="outlined"
              margin="normal"
              size="small">Search</Button>
        </form>

        {/* once search term entered, player results begin here */}
        {
          this.state.players.map(player => (
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
                    {player.position} // {player.teamName}
                  </Typography>
                </CardContent>
                </Link>
              </CardActionArea>
              <CardActions>
                {/* <Button><Link style={{ textDecoration: 'none' }} to={{
                  pathname: '/player-profile',
                    state: {
                      players: player
                    }
                }}>Player Profile
                </Link></Button> */}
                
                {/* <Button size="small" color="primary">
                  Player Profile
                </Button> */}
              </CardActions>
            </Card>
            // </Link>
          ))
        }
      </div>
    )
  }
}
