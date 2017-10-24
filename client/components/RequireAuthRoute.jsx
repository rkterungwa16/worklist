import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const RequireAuthRoute = ({component: Component, loggedIn, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      return loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      );
    }}
  />
);

export default RequireAuthRoute;

