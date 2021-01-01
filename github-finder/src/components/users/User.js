import React, { Component } from 'react';

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_utl,
      followers,
      following,
      public_repos,
      public_gists,
      firebale,
    } = this.props.user;

    const { loading } = this.props;

    return (
      <div>
        {login}
        {name}
      </div>
    );
  }
}

export default User;
