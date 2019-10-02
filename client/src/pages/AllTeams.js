import React, {Component} from 'react';

// Material-UI Components
import Grid from '@material-ui/core/Grid';

// React APIs
// import API from "../utils/API";

export default class AllTeams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teamsArr: []
        };
    }

    styles = {
        paper: {
            padding: ".5rem"
        },
        image: {
            maxWidth: "-webkit-fill-available"
        }
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
                <Grid alignItems="center" justify="space-between" container>
                    {this
                        .state
                        .teamsArr
                        .map(team => (
                            <Grid key={team.teamName} style={this.styles.paper} xs={4} item>
                                <img style={this.styles.image} src={team.teamLogo} alt={team.teamName}/>
                            </Grid>
                        ))}
                </Grid>
            </div>
        )
    }
}
