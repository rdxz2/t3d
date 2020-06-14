import './lay.css';

import { LogoutOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Drawer, Layout, PageHeader, Popover, Divider } from 'antd';
import React from 'react';
import { useHistory, Redirect } from 'react-router';

import CmpPrivateRoute from '../components/cmpPrivateRoute';
import CmpRunningTime from '../components/cmpRunningTime';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import PAGE from '../constants/PAGE';
import CtxApi from '../contexts/ctxApi';
import PgHome from '../pages/pgHome';
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

  // notification drawer
  const [isDrawerNotificationOpen, isDrawerNotificationOpenSet] = React.useState(false);

  // user profile
  const [userProfile, userProfileSet] = React.useState({});

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitiaData = React.useCallback(() => {
    // get user profile
    svsT3dapi
      .sendRequest('api/user/profileMinimal', HTTPMETHOD.GET)
      .then((response) => userProfileSet(response.data))
      .catch((error) => {});
  }, [svsT3dapi]);

  // handle open/close drawer notification
  const handleDrawerNotificationOpen = () => isDrawerNotificationOpenSet(true);
  const handleDrawerNotificationClose = () => isDrawerNotificationOpenSet(false);

  // change page title
  const handleChangeActivePage = (newTitle) => {
    // change page header title
    currentActivePageSet(newTitle);

    // change tab title
    setDocumentTitle(newTitle);
  };

  // log out
  const handleLogOut = () => {
    // remove token
    svsT3dapi.removeApiJwt();

    // redirect to login page
    history.replace('/login');
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // request t3d jwt validity
  React.useEffect(() => {
    svsT3dapi
      .sendRequest('api/authentication/check', HTTPMETHOD.GET)
      .then((response) => prepareInitiaData())
      .catch((error) => history.replace('/login'));
  }, [history, prepareInitiaData, svsT3dapi]);

  // END -- EFFECTS

  // construct user name initials
  const userNameInitials = userProfile.name
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
        <LayDrawerNotification></LayDrawerNotification>
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
          <Popover key='page-header-miniprofile' placement='bottomRight' title='Your profile' content={<LayMiniProfile profile={userProfile} nameInitials={userNameInitials}></LayMiniProfile>} style={{ width: 400 }}>
            {userAccountButton}
          </Popover>,
          // notification
          <Badge key='page-header-badge-notification' count={48}>
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