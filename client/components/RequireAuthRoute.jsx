import React from 'react';
import decodeJwt from 'jwt-decode';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/**
 * Function to protect some routes from being accesible
 * if user is unauthenticated
 * @param {object} props
 * @returns {component} route or spinner
 */
const RequireAuthRoute = ({ component: Component, path: route, authenticated }) => {
  const token = window.localStorage.getItem('token');
  if (token !== null) {
    const decodeToken = decodeJwt(token);
    const exp = decodeToken.exp < new Date().getTime() / 1000;
    if (exp === true) {
      window.localStorage.clear();
    }
  }

  const access = authenticated.loggedIn || window.localStorage.token !== undefined;
  if (access) {
    return (<Route
      path={route}
      render={
        props => (
          access ?
            (
              <Component {...props} />
            ) : (
              <div>
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: props.location }
                  }}
                />
              </div>
            )
        )}
    />
    );
  } return (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  );
};


RequireAuthRoute.propTypes = {
  authenticated: PropTypes.shape({
    loggedIn: false
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.authenticated
});


export default connect(mapStateToProps, null)(RequireAuthRoute);

