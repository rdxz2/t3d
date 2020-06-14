import './pgRegister.css';

import { Divider } from 'antd';
import React from 'react';

import FrRegister from './pgRegister/frRegister';

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
      <FrRegister></FrRegister>
    </div>
  );
};

export default PgRegister;
