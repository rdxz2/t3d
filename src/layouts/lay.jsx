import './lay.css';

import { LogoutOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Drawer, Layout, PageHeader, Popover } from 'antd';
import React from 'react';
import { Redirect, useHistory } from 'react-router';

import CmpPrivateRoute from '../components/cmpPrivateRoute';
import CmpRunningTime from '../components/cmpRunningTime';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import PAGE from '../constants/PAGE';
import CtxApi from '../contexts/ctxApi';
import { setDocumentTitle } from '../utilities/utlWindow';
import LayDrawerNotification from './layDrawerNotification';
import LayMiniProfile from './layMiniProfile';

const Lay = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // current page
  const [currentActivePage, currentActivePageSet] = React.useState('');

  // user profile
  const [profile, profileSet] = React.useState({});

  // notifications
  const [notifications, notificationsSet] = React.useState([]);

  // notification drawer
  const [isDrawerNotificationOpen, isDrawerNotificationOpenSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitiaData = React.useCallback(async () => {
    // send request (minimal profile)
    const responseMinimalProfile = await svsT3dapi.sendRequest('api/user/profileminimal', HTTPMETHOD.GET);

    // set minimal profile
    profileSet(responseMinimalProfile.data);

    // send request (notifications)
    const responseNotifications = await svsT3dapi.sendRequest('api/user/notifications', HTTPMETHOD.GET);

    // set notifications
    notificationsSet(responseNotifications.data);
  }, [svsT3dapi]);

  // handle open/close drawer notification
  const handleDrawerNotificationOpen = () => isDrawerNotificationOpenSet(true);
  const handleDrawerNotificationClose = () => isDrawerNotificationOpenSet(false);

  // change page title
  const handleChangeActivePage = React.useCallback((newTitle) => {
    // change page header title
    currentActivePageSet(newTitle);

    // change tab title
    setDocumentTitle(newTitle);
  }, []);

  // log out
  const handleLogOut = () => {
    // remove jwt from local storage
    svsT3dapi.removeApiJwt();

    // remove refresh token from local storage
    svsT3dapi.removeApiRefreshToken();

    // redirect to login page
    history.replace('/login');
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    prepareInitiaData();
  }, [prepareInitiaData]);

  // END -- EFFECTS

  // construct user name initials
  const userNameInitials = profile.name
    ?.match(/\b(\w)/g)
    .join('')
    .toUpperCase();

  // render account button based on initials
  const userAccountButton = (
    <Button shape='circle' onClick={() => history.push('account')}>
      {userNameInitials ? userNameInitials : <UserOutlined></UserOutlined>}
    </Button>
  );

  return (
    <Layout>
      {/* notification drawer */}
      <Drawer className='drawer-notification' title='Notification' placement='right' visible={isDrawerNotificationOpen} onClose={handleDrawerNotificationClose}>
        <LayDrawerNotification notifications={notifications}></LayDrawerNotification>
      </Drawer>
      {/* page header */}
      <PageHeader
        ghost={false}
        onBack={() => history.goBack()}
        title={`${currentActivePage} - t3d${process.env.REACT_APP_ENVIRONMENT}`}
        className='page-header'
        extra={[
          // running time
          <CmpRunningTime key='page-header-runningtime' isBold></CmpRunningTime>,
          // divider
          <Divider key='page-header-divider1' type='vertical' style={{ marginRight: 0 }}></Divider>,
          // user's account
          <Popover key='page-header-miniprofile' placement='bottomRight' title='Your profile' content={<LayMiniProfile profile={profile} nameInitials={userNameInitials}></LayMiniProfile>} style={{ width: 400 }}>
            {userAccountButton}
          </Popover>,
          // notification
          <Badge key='page-header-badge-notification' count={notifications.length}>
            <Button type='primary' shape='circle' icon={<NotificationOutlined></NotificationOutlined>} onClick={handleDrawerNotificationOpen}></Button>
          </Badge>,
          // divider
          <Divider key='page-header-divider2' type='vertical' style={{ marginRight: 0 }}></Divider>,
          // log out button
          <Button key='page-header-logout' shape='circle' type='danger' icon={<LogoutOutlined></LogoutOutlined>} onClick={handleLogOut}></Button>,
        ]}></PageHeader>
      {/* page content */}
      <Layout.Content className='content-main'>
        {/* routing (home) */}
        <CmpPrivateRoute exact path={'/'} component={() => <Redirect to='/home'></Redirect>} handleChangeActivePage={handleChangeActivePage}></CmpPrivateRoute>
        {/* routing (private routes) */}
        {PAGE.map((page, pageIndex) => (
          <CmpPrivateRoute key={pageIndex} path={page.path} component={page.component} handleChangeActivePage={handleChangeActivePage}></CmpPrivateRoute>
        ))}
      </Layout.Content>
    </Layout>
  );
};

export default Lay;
