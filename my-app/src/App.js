import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import {Navbar} from './components/layout/Navbar.js';
import {Landing} from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js'
import  Alert from './components/layout/Alert.js'
import { loadUser } from './actions/auth.js';
import {loadUserStr} from './actions/auth.js';
import setAuthToken from './utils/setAuthToken.js';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/layout/Dashboard.js';
import CreateProfile from './components/layout/CreateProfile.js';
import EditProfile from './components/layout/EditProfile.js';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/post/Post.js';
import './App.css';
// Redux 
import {Provider} from 'react-redux'
import store from './store'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      //console.log(localStorage.token)
      
    }
    store.dispatch(loadUserStr(localStorage.token))
  }, []);


  return (
<Provider store={store}>
<Router>
    <Fragment>
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
        <Route exact path='/tutor-profiles' element={<Profiles/>} />
        <Route exact path='/create-tutor-profile' element={<CreateProfile/>} />
        <Route exact path='/edit-tutor-profile' element={<EditProfile/>} />
        <Route exact path='/forums' element={<Posts/>} />
        <Route exact path='/forums/:id' element={<Post/>} />
      </Routes>
    </Fragment>
</Router>
</Provider>
)};

export default App;
