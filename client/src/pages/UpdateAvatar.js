import React, { Component } from 'react';

// React Components
import AvatarForm from "../components/AvatarForm";

export default class UpdateAvatar extends Component {

    styles = {
        avatar: {
            display: "block",
            margin: "0 auto",
            borderRadius: "50%",
            maxWidth: "50%"
        }
    }

    state = {
        avatarImg: "avatar.png",
    }

    render() {
        return (
            <div>
                <h1>Update Avatar</h1>
                <img alt="Current Avatar" style={this.styles.avatar} src={this.state.avatarImg} />
                <AvatarForm />
            </div>
        )
    }
}

