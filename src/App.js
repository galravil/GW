import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Welcome from './components/pages/Welcome'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Home from './components/pages/Home'



const App = () => {
  useEffect( () => {
    // init Materialize JS
    M.AutoInit()
  })

  return (
    
    <Router>
      <Route exact path='/welcome' component={Welcome} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/' component={Home} />
    </ Router>

    

    
  );
}

export default App;
