import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

import COLOR from '../../constants/COLOR';
import FORMLAYOUT from '../../constants/FORMLAYOUT';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import CtxApi from '../../contexts/ctxApi';
import { convertUrlBase64ToUint8Array } from '../../utilities/utlType';

const LoginForm = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // submit: log in
  const handleSubmit = async (values) => {
    // submitting...
    isSubmittingSet(true);

    try {
      // send log in request
      const response = await svsT3dapi.sendRequest('api/authentication/login', HTTPMETHOD.POST, values, { isLoggingIn: true });

      // set jwt to local storage
      svsT3dapi.setApiJwt(response.data.token);

      // set refresh token to local storage
      svsT3dapi.setApiRefreshToken(response.data.refreshToken);

      // subscribe to push notification if available in browser
      if (navigator.serviceWorker) {
        // wait for service worker initialization
        navigator.serviceWorker.ready.then((registration) => {
          return registration.pushManager
            .getSubscription()
            .then(async (subscription) => {
              // return current subscription if exist
              if (subscription) return subscription;

              // send request
              const responseVapidKeyPublic = await svsT3dapi.sendRequest('api/pushnotification/vapid', HTTPMETHOD.GET);
              if (!responseVapidKeyPublic.data.vapid_key_public) return message.error('cannot subscribe to ');

              // subscribe to local push manager
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertUrlBase64ToUint8Array(responseVapidKeyPublic.data.vapid_key_public),
              });
            })
            .then(async (subscription) => {
              try {
                // subscribe to push notification
                const responseSubscription = await svsT3dapi.sendRequest('api/pushnotification/subscribe', HTTPMETHOD.POST, { subscription });

                return responseSubscription;
              } catch (error) {}
            });
        });
      }

      // display message
      message.success(`log in success, welcome ${response.data.name}`);

      // redirect to home
      history.replace('/');
    } catch (error) {
      // not submitting...
      isSubmittingSet(false);
    }
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // redirect to home is token is available
  React.useEffect(() => {
    if (!svsT3dapi.isApiJwtExpired()) history.replace('/');
  }, [history, svsT3dapi]);

  // END -- EFFECTS

  return (
    <Form {...FORMLAYOUT.separateRow.body} onFinish={handleSubmit}>
      {/* username */}
      <Form.Item hasFeedback label='Username' name='username' rules={[{ required: true, whitespace: true, message: 'username is required' }]}>
        <Input autoFocus placeholder='your username' prefix={<UserOutlined style={{ color: COLOR.ICON_PLACEHOLDER }}></UserOutlined>}></Input>
      </Form.Item>
      {/* password */}
      <Form.Item hasFeedback label='Password' name='password' rules={[{ required: true, whitespace: true, message: 'password is required' }]}>
        <Input.Password placeholder='your password' prefix={<LockOutlined style={{ color: COLOR.ICON_PLACEHOLDER }}></LockOutlined>}></Input.Password>
      </Form.Item>
      {/* submit */}
      <Button block type='primary' htmlType='submit' loading={isSubmitting} icon={<LoginOutlined></LoginOutlined>}></Button>
    </Form>
  );
};

export default LoginForm;
