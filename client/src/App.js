import React,{Fragment,useEffect} from 'react';
import './App.css';
import {Route,Switch} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from "./components/dashboard/Dashboard"
import Createprofile from "./components/profile-form/CreateProfile"
import PrivateRoute from "./components/routing/PrivateRoute"
import EditProfile from "./components/profile-form/EditProfile"
import AddEducation from "./components/profile-form/AddEducation"
import AddExperience from "./components/profile-form/AddExperience"
import Profiles from './components/profiles/Profiles'
import Profile from './components/otherprofile/Profiles'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
//Redux
import {Provider} from "react-redux"
import store from "./store"
import setAuthToken from "./utils/setAuthToken"
import { loadUser } from './action/auth';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App=()=> {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return(
  <Provider store={store}>
  <Fragment>
    <Navbar/>
    <Route exact path="/" component={Landing}/>
    <section className="container">
      <Alert/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/create-profile" component={Createprofile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
      </Switch>
    </section>
  </Fragment>
  </Provider>
)}

export default App;
