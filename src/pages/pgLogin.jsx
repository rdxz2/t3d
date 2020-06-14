import './pgLogin.css';

import { Card, Divider, Button } from 'antd';
import React from 'react';

import packageJson from '../../package.json';
import { setDocumentTitle } from '../utilities/utlWindow';
import FrLogin from './pgLogin/frLogin';
import { useHistory } from 'react-router';

const PgLogin = () => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // change document title
    setDocumentTitle('Log in');
  }, []);

  // END -- EFFECTS

  return (
    <Card className='card-login' cover={<img alt='t3d' src={require('../images/t3dlogo.jpg')} />}>
      {/* divider w/ app name */}
      <Divider type='horizontal' style={{ marginTop: 0, marginBottom: 0 }}>
        Log in - t3d{process.env.REACT_APP_ENVIRONMENT}
      </Divider>
      {/* app version */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'grey', fontSize: 12, fontStyle: 'italic', marginBottom: 0 }}>v{packageJson.version}</p>
      </div>
      {/* login form */}
      <FrLogin></FrLogin>
      {/* divider */}
      <Divider type='horizontal' dashed style={{ marginTop: 5, marginBottom: 5, width: '50%' }}>
        or
      </Divider>
      {/* register */}
      <Button block type='dashed' onClick={() => history.push('/register')}>
        Register
      </Button>
      {/* forgot password */}
      <Button block danger type='link' onClick={() => history.push('/forgotpassword')}>
        Forgot password
      </Button>
    </Card>
  );
};

export default PgLogin;
