import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.less';
import Lay from './layouts/lay';
import PgLogin from './pages/pgLogin';
import PgNotFound from './pages/pgNotFound';
import { CtxPvdApi } from './contexts/ctxApi';
import PgForgotPassword from './pages/pgForgotPassword';
import PgRegister from './pages/pgRegister';

const App = () => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    // contexts
    <CtxPvdApi>
      {/* routes */}
      <Router>
        {/* switch */}
        <Switch>
          {/* public routes */}
          <Route exact path='/login' component={PgLogin}></Route>
          <Route exact path='/register' component={PgRegister}></Route>
          <Route exact path='/forgotpassword' component={PgForgotPassword}></Route>
          {/* private routes */}
          <Route path='/' component={Lay}></Route>
          {/* not found */}
          <Route component={PgNotFound}></Route>
        </Switch>
      </Router>
    </CtxPvdApi>
  );
};

export default App;
