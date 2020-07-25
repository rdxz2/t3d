import './lay.css';

import { BulbOutlined, LogoutOutlined, NotificationOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Divider, Drawer, Layout, PageHeader, Popover, Typography } from 'antd';
import React from 'react';
import { Redirect, useHistory } from 'react-router';

import CmpMiniProfile from '../components/cmpMiniProfile';
import CmpPrivateRoute from '../components/cmpPrivateRoute';
import CmpRunningTime from '../components/cmpRunningTime';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import PAGE from '../constants/PAGE';
import CtxApi from '../contexts/ctxApi';
import CtxTheme from '../contexts/ctxTheme';
import { makeNameInitials } from '../utilities/utlType';
import { setDocumentTitle } from '../utilities/utlWindow';
import LayDrawerNotification from './layDrawerNotification';

const Lay = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // theme
  const {
    isDarkTheme,
    handleChangeDarkTheme,
    handleToggleDarkTheme,
    handleGetLocalStorageDarkTheme,
    handleGetLocalStorageLightThemePrimaryColor,
    handleGetLocalStorageDarkThemePrimaryColor,
    handleSetLocalStorageLightThemePrimaryColor,
    handleSetLocalStorageDarkThemePrimaryColor,
  } = React.useContext(CtxTheme);

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
  const [urlProfilePicture, urlProfilePictureSet] = React.useState('');

  // notifications
  const [notifications, notificationsSet] = React.useState([]);

  // notification drawer
  const [isDrawerNotificationOpen, isDrawerNotificationOpenSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // change profile picture url
  const handleChangeProfilePictureUrl = React.useCallback((newUrl) => urlProfilePictureSet(newUrl), []);

  // prepare initial data
  const prepareInitiaData = React.useCallback(async () => {
    // START -- CONFIGURE APP THEME

    // send request (theme preference)
    const responsePreferenceTheme = await svsT3dapi.sendRequest('api/preferences/theme', HTTPMETHOD.GET);

    // change global theme
    if (
      responsePreferenceTheme.data.is_dark_theme !== handleGetLocalStorageDarkTheme() ||
      responsePreferenceTheme.data.color_primary_light !== handleGetLocalStorageLightThemePrimaryColor() ||
      responsePreferenceTheme.data.color_primary_dark !== handleGetLocalStorageDarkThemePrimaryColor()
    ) {
      // set local storage primary colors for both theme
      handleSetLocalStorageLightThemePrimaryColor(responsePreferenceTheme.data.color_primary_light);
      handleSetLocalStorageDarkThemePrimaryColor(responsePreferenceTheme.data.color_primary_dark);

      handleChangeDarkTheme(responsePreferenceTheme.data.is_dark_theme || false, responsePreferenceTheme.data.color_primary_light, responsePreferenceTheme.data.color_primary_dark);
    }

    // END -- CONFIGURE APP THEME

    // get jwt information
    const apiJwtInfo = svsT3dapi.getApiJwtInfo();

    // send request (minimal profile)
    const responseMinimalProfile = await svsT3dapi.sendRequest(`api/user/profileminimal/${apiJwtInfo.id}`, HTTPMETHOD.GET);

    // set minimal profile
    profileSet(responseMinimalProfile.data);

    // set profile picture url
    handleChangeProfilePictureUrl(responseMinimalProfile.data.url_profile_picture);

    // send request (notifications)
    const responseNotifications = await svsT3dapi.sendRequest('api/user/notifications', HTTPMETHOD.GET);

    // set notifications
    notificationsSet(responseNotifications.data);
  }, [
    handleChangeDarkTheme,
    handleChangeProfilePictureUrl,
    handleGetLocalStorageDarkTheme,
    handleGetLocalStorageDarkThemePrimaryColor,
    handleGetLocalStorageLightThemePrimaryColor,
    handleSetLocalStorageDarkThemePrimaryColor,
    handleSetLocalStorageLightThemePrimaryColor,
    svsT3dapi,
  ]);

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

  // toggle app theme
  const handleToggleTheme = async () => {
    // toggle dark theme
    const _isDarkTheme = handleToggleDarkTheme();

    try {
      // send request (dark theme preference)
      await svsT3dapi.sendRequest('api/preferences/darktheme', HTTPMETHOD.POST, { is_dark_theme: _isDarkTheme });
    } catch (error) {}
  };

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
        title={
          <span>
            {currentActivePage} - <Typography.Link onClick={() => history.push('/home')}>t3d{process.env.REACT_APP_ENVIRONMENT}</Typography.Link>
          </span>
        }
        className='page-header'
        extra={[
          // running time
          <CmpRunningTime key='page-header-runningtime' isBold></CmpRunningTime>,
          // divider
          <Divider key='page-header-divider1' type='vertical' style={{ marginRight: 12 }}></Divider>,
          // user's account
          <Popover mouseEnterDelay={1} key='page-header-miniprofile' placement='bottomRight' title='Your profile' content={<CmpMiniProfile profile={profile} urlProfilePicture={urlProfilePicture}></CmpMiniProfile>} style={{ width: 400 }}>
            <Avatar size={37} src={urlProfilePicture && urlProfilePicture} className='user-avatar' shape='circle' onClick={() => history.push('/account')} style={{ marginRight: 0 }}>
              {!urlProfilePicture && makeNameInitials(profile.name)}
            </Avatar>
          </Popover>,
          // theme toggler
          <Button key='page-header-badge-theme' shape='circle' icon={<BulbOutlined></BulbOutlined>} onClick={handleToggleTheme}></Button>,
          // notification
          <Badge key='page-header-badge-notification' count={notifications.length}>
            <Button type='primary' shape='circle' icon={<NotificationOutlined></NotificationOutlined>} onClick={handleDrawerNotificationOpen} style={{ marginLeft: 12 }}></Button>
          </Badge>,
          // divider
          <Divider key='page-header-divider2' type='vertical' style={{ marginRight: 0 }}></Divider>,
          // log out button
          <Button key='page-header-logout' shape='circle' type='danger' icon={<LogoutOutlined></LogoutOutlined>} onClick={handleLogOut}></Button>,
        ]}></PageHeader>
      {/* page content */}
      <Layout.Content className={`content-main ${isDarkTheme && 'dark'}`}>
        {/* routing (home) */}
        <CmpPrivateRoute exact path={'/'} component={() => <Redirect to='/home'></Redirect>} handleChangeActivePage={handleChangeActivePage}></CmpPrivateRoute>
        {/* routing (private routes) */}
        {PAGE.map((page, pageIndex) => (
          <CmpPrivateRoute
            key={pageIndex}
            path={page.path}
            component={page.component}
            handleChangeActivePage={handleChangeActivePage}
            urlProfilePicture={urlProfilePicture}
            handleChangeProfilePictureUrl={handleChangeProfilePictureUrl}></CmpPrivateRoute>
        ))}
      </Layout.Content>
    </Layout>
  );
};

export default Lay;
