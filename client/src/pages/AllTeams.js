import React, { Component } from 'react';

// Material-UI Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// React APIs 
import API from "../utils/API";

export default class AllTeams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teamsArr: []
        };
    }

    // Async/Await - Source: https://www.valentinog.com/blog/await-react/
    async componentDidMount() {
        try {
            const response = await fetch("/api/getTeams");
            const json = await response.json();
            this.setState({teamsArr: json});
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    {this.state.teamsArr.map(team => (<Grid xs={4} item><Paper>{team.teamName}</Paper></Grid>))}
                </Grid>
            </div>
        )
    }
}
