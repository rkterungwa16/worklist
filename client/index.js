import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import $ from 'jquery';
import history from 'react-history/BrowserHistory';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import reducer from './reducers';
import './style.scss';


import App from './App';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EditProfile from './components/EditProfile';
import ChangeProfilePicture from './components/ChangeProfilePicture';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import RequireAuthRoute from './components/RequireAuthRoute';
import AuthRoute from './components/AuthRoute';
import NotFound from './components/NotFound';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

render((
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <AuthRoute exact path='/' component={App} />
        <AuthRoute exact path='/signup' component={Signup} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/reset/:id' component={ResetPassword} />
        <AuthRoute exact path='/forgot-password/' component={ForgotPassword} />
        <RequireAuthRoute exact path='/edit-profile' component={EditProfile} />
        <RequireAuthRoute exact path='/change-profile-picture' component={ChangeProfilePicture} />
        <RequireAuthRoute exact path='/dashboard' component={Dashboard} />
        <Route exact path='*' component={NotFound} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('app'));

