import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    window.UserStore.isAuthenticated && window.UserStore.isAdmin
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

export default AdminRoute
