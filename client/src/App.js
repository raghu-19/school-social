import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddCompetitions from './components/add-credentials/AddCompetitions';
import AddAchievements from './components/add-credentials/AddAchievements';

import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

import PrivateRoute from './components/common/PrivateRoute';

import { logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

//Check for TOken
if(localStorage.jwtToken){
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now / 1000;
  if(decoded.exp < currentTime){
    //Logout the user
    store.dispatch(logoutUser());
    //To do: Clear Current Profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.herf = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
      <Router>
      <div className="App">
        <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-competition"
                  component={AddCompetitions}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-achievement"
                  component={AddAchievements}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
          </div>
        <Footer />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
