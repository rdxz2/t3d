import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isJwtExpired } from '../utilities/utlJwt';

const CmpPrivateRoute = ({ component: Component, ...otherParameters }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- STATES

  // END -- STATES

  // START -- EFFECTS

  // END -- EFFECTS

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  return <Route {...otherParameters} render={(props) => (isJwtExpired() ? <Component {...props} {...otherParameters} /> : <Redirect to='/login' />)} />;
};

export default CmpPrivateRoute;
