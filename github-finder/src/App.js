import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';

const App = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null,
  // };

  // async componentDidMount() {
  //   this.setState({
  //     loading: true,
  //   });

  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   // console.log(res.data);

  //   this.setState({
  //     users: res.data,
  //     loading: false,
  //   });
  // }

  const searchUsers = async (text) => {
    // console.log(text);

    // this.setState({ loading: true });
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // console.log(res.data);

    // this.setState({
    //   users: res.data.items,
    //   loading: false,
    // });

    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    // console.log(text);

    // this.setState({ loading: true });
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // console.log(res.data);
    // console.log(res.data);
    // this.setState({
    //   user: res.data,
    //   loading: false,
    // });
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    // console.log(text);

    // this.setState({ loading: true });
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // console.log(res.data);

    // this.setState({
    //   repos: res.data,
    //   loading: false,
    // });
    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    // this.setState({ users: [], loading: false });
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (message, type) => {
    // console.log('setting alert');
    // this.setState({ alert: { message, type } });
    setAlert({ message, type });
    setTimeout(() => {
      // this.setState({ alert: null });
      setAlert(null);
    }, 5000);
  };

  // const { users, loading, user, repos } = this.state;
  // console.log('main app');
  // console.log(user);
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' render={(props) => <About />} />
              <Route
                exact
                path='/user/:login'
                render={(props) => {
                  // console.log('Inside app');
                  // console.log(user);
                  return (
                    <User
                      {...props}
                      getUser={getUser}
                      getUserRepos={getUserRepos}
                      repos={repos}
                      user={user}
                      loading={loading}
                    />
                  );
                }}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
