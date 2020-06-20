import './pgRegister.css';

import { Divider } from 'antd';
import React from 'react';

import RegisterForm from './pgRegister/registerForm';

const PgRegister = () => {
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
    <div className='page-register'>
      {/* divider */}
      <Divider type='horizontal'>Register to t3d{process.env.REACT_APP_ENVIRONMENT}</Divider>
      {/* register form */}
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default PgRegister;
