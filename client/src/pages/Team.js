import React, { Component } from 'react'
// import { Link }  from 'react-router-dom';

export class Team extends Component {
  state = {
    roster: []
  }

  componentDidMount = () => {
    // /api/getTeam/:teamName
  }

  render() {
    return (
      <div>
        Team Roster
      </div>
    )
  }
}

export default Team