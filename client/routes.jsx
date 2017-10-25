import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import TaskPage from './pages/TaskPage';


const Routes = () => (
  <Switch>
    <Route path='/' component={App} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <Route path='/dashboard' component={TaskPage} />
  </Switch>
);

export default Routes;

