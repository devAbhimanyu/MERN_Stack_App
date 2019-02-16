import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utility/setAuthToken';
import { setCurrentUser, logoutUser } from '../../store/actions/auth.action';
import { clearCurrentProfile } from '../../store/actions/profile.action';
import Navbar from '../Layout/NavBar/NavBar';
import Landing from '../Layout/Landing/Landing';
import Footer from '../../components/Layout/Footer';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
// import Dashboard from '../Dashboard/Dashboard';
import './App.css';
import store from '../../store/store';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
//import CreateUserProfile from '../Dashboard/Profile/CreateProfile';
//import EditUserProfile from '../Dashboard/Profile/EditProfile';
//import AddUserExperience from '../Dashboard/Experience/AddExperience';
//import AddUserEducation from '../Dashboard/Education/AddEducation';
import AllProfiles from '../Profiles/Profiles';
import HandleProfile from '../Profiles/Profile/Profile';
import NotFound from '../../components/NotFound/NotFound';
import Post from '../Posts/Post/Post';
//applying lazy loading using suspense
const Dashboard = React.lazy(() => import('../Dashboard/Dashboard'));
const EditUserProfile = React.lazy(() => import('../Dashboard/Profile/EditProfile'));
const CreateUserProfile = React.lazy(() => import('../Dashboard/Profile/CreateProfile'));
const AddUserExperience = React.lazy(() => import('../Dashboard/Experience/AddExperience'));
const AddUserEducation = React.lazy(() => import('../Dashboard/Education/AddEducation'));
//const HandleProfile = React.lazy(() => import('../Profiles/Profile/Profile'));
const Posts = React.lazy(() => import('../Posts/Posts'));
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
      <React.Fragment >
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className="container">
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/view-profiles' component={AllProfiles} />
            <Route exact path='/profile/:handle' component={HandleProfile} />
            {/* <Switch><PrivateRoute exact path='/dashboard' component={Dashboard} /></Switch> */}
            <Switch><PrivateRoute exact path='/dashboard' component={Dashboard} isLazy={true} /></Switch>
            <Switch><PrivateRoute exact path='/create-profile' component={CreateUserProfile} isLazy={true} /></Switch>
            <Switch><PrivateRoute exact path='/edit-profile' component={EditUserProfile} isLazy={true} /></Switch>
            <Switch><PrivateRoute exact path='/add-experience' component={AddUserExperience} isLazy={true} /></Switch>
            <Switch><PrivateRoute exact path='/add-education' component={AddUserEducation} isLazy={true} /></Switch>
            <Switch><PrivateRoute exact path='/user-feed' component={Posts} isLazy={true} /></Switch>
            <Switch><PrivateRoute exact path='/post/:id' component={Post} isLazy={false} /></Switch>
            <Route exact path="/not-found" component={NotFound} />
            {/* <Redirect from='/' to='/not-found' /> */}
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
