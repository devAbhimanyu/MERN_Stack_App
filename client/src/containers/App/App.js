import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utility/setAuthToken';
import { setCurrentUser, logoutUser } from '../../store/actions/auth.action';
import { clearCurrentProfile } from '../../store/actions/profile.action';
import Navbar from '../Layout/NavBar/NavBar';
import Landing from '../Layout/Landing/Landing';
import Footer from '../../components/Layout/Footer';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';
import store from '../../store/store';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import CreateUserProfile from '../Dashboard/Profile/CreateProfile';
//checking for token
if (localStorage.jwtToken) {
  //setting token
  setAuthToken(localStorage.jwtToken);

  const decode = jwtDecode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decode));

  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(logoutUser());
    //clear profile state
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className="container">
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Switch><PrivateRoute exact path='/dashboard' component={Dashboard} /></Switch>
            <Switch><PrivateRoute exact path='/create-profile' component={CreateUserProfile} /></Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
