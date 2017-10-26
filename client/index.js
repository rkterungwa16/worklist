import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import history from 'react-history/BrowserHistory';
import reducer from './reducers';

import App from './App';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RequireAuthRoute from './components/RequireAuthRoute';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

render((
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('app'));

