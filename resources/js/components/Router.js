import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

//import Home from './components/Home/Home';
//import Login from './views/Login/Login';
//import Register from './views/Register/Register';
//import NotFound from './views/NotFound/NotFound'

// User is LoggedIn
//import PrivateRoute from './PrivateRoute'
//import Dashboard from './views/user/Dashboard/Dashboard';
import Customers from '../pages/Customers'
import Properties from '../pages/Properties'
import Changes from '../pages/Changes'

const Main = props => (
<Switch>
  <Route exact path='/' component={Customers}/>
  <Route path='/properties/' component={Properties}/>
  <Route path='/changes/' component={Changes}/>
</Switch>
);
export default Main;