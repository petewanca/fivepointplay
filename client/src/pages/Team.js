import React, { Component } from 'react'
import { Link }  from 'react-router-dom';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    maxWidth: '100%',
    overflowX: 'auto',
    marginBottom: "5%"
  },
  logo: {
    margin: 0,
    padding: 0
  },
  link: {
    textDecoration: "none",
  },
};

export class Team extends Component {
  state = {
    teamName: "",
    teamLogo: "",
    roster: []
  }

  componentDidMount = () => {
    let teamName = this.props.location.state.team.teamName;
    let teamLogo = this.props.location.state.team.teamLogo;
    axios
      .get(`/api/getTeam/${teamName}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          teamName: teamName,
          teamLogo: teamLogo,
          roster: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <img style={styles.logo} src={this.state.teamLogo} alt="teamLogo" />
        <h1>{this.state.teamName}</h1>

        <Paper style={styles.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.roster.map(player => (
                <TableRow key={player.id}>
                    <TableCell component="th" scope="row">
                      <Link style={styles.link} to={{
                        pathname: '/player-profile',
                          state: {
                          players: player
                        }
                      }}>
                        {player.playerName}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{player.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

      </div>
    )
  }
}

export default Team