import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import $ from 'jquery';
import history from 'react-history/BrowserHistory';
import 'materialize-css/dist/css/materialize.css';
import reducer from './reducers';
import './style.scss';


import App from './App';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EditProfile from './components/EditProfile';
import Collaborator from './components/Collaborator';
import RequireAuthRoute from './components/RequireAuthRoute';
import AuthRoute from './components/AuthRoute';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

render((
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <AuthRoute exact path='/' component={App} />
        <AuthRoute exact path='/signup' component={Signup} />
        <AuthRoute exact path='/login' component={Login} />
        <RequireAuthRoute exact path='/edit-profile' component={EditProfile} />
        <RequireAuthRoute exact path='/collaborator' component={Collaborator} />
        <RequireAuthRoute exact path='/dashboard' component={Dashboard} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('app'));

