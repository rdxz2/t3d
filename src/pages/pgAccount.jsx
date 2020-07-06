import React from 'react';
import { Divider, Avatar, Spin, Button, Typography } from 'antd';
import { SettingOutlined, RadarChartOutlined } from '@ant-design/icons';
import CtxApi from '../contexts/ctxApi';
import './pgAccount.css';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import { makeNameInitials, convertIsoDateToMoment } from '../utilities/utlType';
import CmpDetail from '../components/cmpDetail';

const PgAccount = ({ handleChangeActivePage }) => {
  // START -- CONTEXTS

  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // profile
  const [profile, profileSet] = React.useState({});
  const [isProfileLoading, isProfileLoadingSet] = React.useState(true);

  // preferences
  const [preferences, preferencesSet] = React.useState();
  const [isPreferencesLoading, isPreferencesLoadingSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    try {
      // send request (profile)
      const responseProfile = await svsT3dapi.sendRequest('api/user/profile', HTTPMETHOD.GET);

      // set profile
      profileSet(responseProfile.data);
      isProfileLoadingSet(false);

      // send request (preferences)
      const responsePreferences = await svsT3dapi.sendRequest('api/user/preferences', HTTPMETHOD.GET);

      // set preferences
      preferencesSet(responsePreferences.data);
      isPreferencesLoadingSet(false);
    } catch (error) {}
  }, [svsT3dapi]);

  // END -- FUNCTIONS

  // START -- EFFECTS

  // change active page
  React.useEffect(() => {
    handleChangeActivePage('Account');
  }, [handleChangeActivePage]);

  // prepare initial data
  React.useEffect(() => {
    prepareInitialData();
  }, [prepareInitialData]);

  // END -- EFFECTS
  return (
    <>
      {/* user information */}
      <Spin spinning={isProfileLoading}>
        {/* main */}
        <div style={{ textAlign: 'center' }}>
          {/* avatar */}
          <Button id='user-avatar' shape='circle'>
            {makeNameInitials(profile.name)}
          </Button>
          {/* username // name */}
          <Typography.Text strong>{`${profile.username} // ${profile.name}`}</Typography.Text>
        </div>
        {/* department */}
        <CmpDetail label='Department' value={profile.department?.name} labelSpan={12} valueSpan={12}></CmpDetail>
        {/* position */}
        <CmpDetail label='Position' value={profile.position?.name} labelSpan={12} valueSpan={12}></CmpDetail>
        {/* joined on */}
        <CmpDetail label='Joined on' value={convertIsoDateToMoment(profile.create_date)} labelSpan={12} valueSpan={12}></CmpDetail>
      </Spin>
      {/* user preferences */}
      <Divider>
        <SettingOutlined></SettingOutlined> Preferences
      </Divider>
      <Spin spinning={isPreferencesLoading}></Spin>
      {/* about this application */}
      {/* (this project is inspired by ...) */}
    </>
  );
};

export default PgAccount;
