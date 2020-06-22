import './pgLogin.css';

import { Card, Divider, Button, message } from 'antd';
import React from 'react';

import packageJson from '../../package.json';
import { setDocumentTitle } from '../utilities/utlWindow';
import LoginForm from './pgLogin/loginForm';
import { useHistory } from 'react-router';
import useQuery from '../hooks/useQuery';
import CtxApi from '../contexts/ctxApi';

const PgLogin = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // url query string
  const queryString = useQuery();

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // remove jwt
    svsT3dapi.removeApiJwt();

    // remove refresh token
    svsT3dapi.removeApiRefreshToken();

    // change document title
    setDocumentTitle('Log in');

    // show warning message if user got to this page by unauthorized
    if (queryString.get('reason') === 'Unauthorized') message.warning('your session has ended, please log in again');
  }, [queryString, svsT3dapi]);

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
      <LoginForm></LoginForm>
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
