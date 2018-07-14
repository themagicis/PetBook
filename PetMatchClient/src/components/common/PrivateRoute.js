import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    window.UserStore.isAuthenticated
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

export default PrivateRoute
