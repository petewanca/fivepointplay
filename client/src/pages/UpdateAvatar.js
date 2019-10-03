import React, { Component } from 'react';

// React Components
import AvatarForm from "../components/AvatarForm";
import UILink from '@material-ui/core/Link';

export default class UpdateAvatar extends Component {

    styles = {
        avatar: {
            display: "block",
            margin: "0 auto",
            borderRadius: "50%",
            maxWidth: "50%"
        },
        link: {
            margin: ".5rem 0 1rem 0",
            display: "block"
        }
    }

    state = {
        avatarUrl: "",
    }

    componentDidMount() {
        var jwt = localStorage.getItem("jwt")
        var userData = JSON.parse(jwt);
        var avatarUrl = userData.data.avatarUrl;
        console.log(avatarUrl)
        if (avatarUrl) {
            this.setState({
                avatarUrl
            })
        } else {
            this.setState({
                avatarUrl: "avatar.png"
            })
        }
    }


    render() {
        return (
            <div>
                <h1>Update Avatar</h1>
                <img alt="Current Avatar" style={this.styles.avatar} src={this.state.avatarUrl} />
                <AvatarForm />
                <UILink style={this.styles.link} target="_blank" rel="noopener" href="https://en.gravatar.com/">Create a Gravatar</UILink>
            </div>
        )
    }
}

