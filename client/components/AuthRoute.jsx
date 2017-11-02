import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Function to protect some routes from being accesible
 * if user is unauthenticated
 * @param {object} props
 * @returns {component} route or spinner
 */

const AuthRoute = ({ component: Component, path: route }) => (<Route
  path={route}
  render={props => (
    window.localStorage.getItem('token') !== null ?
      <Redirect
        to={{
          pathname: '/dashboard',
          state: { from: props.location }
        }}
      /> : <Component {...props} />)}
/>
);


AuthRoute.propTypes = {
  location: PropTypes.shape({}).isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};


export default AuthRoute;

