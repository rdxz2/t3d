import './pgAccount.css';

import { SettingOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Spin, Typography } from 'antd';
import React from 'react';

import CmpDetail from '../components/cmpDetail';
import FORMLAYOUT from '../constants/FORMLAYOUT';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import CtxApi from '../contexts/ctxApi';
import { convertIsoDateToMoment } from '../utilities/utlType';
import AccountChangeProfilePicture from './pgAccount/accountChangeProfilePicture';

const PgAccount = ({ handleChangeActivePage, urlProfilePicture, handleChangeProfilePictureUrl }) => {
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
    <Row gutter={[8]}>
      {/* profile */}
      <Col span={8}>
        {/* user information */}
        <Spin spinning={isProfileLoading}>
          {/* profile picture */}
          <Row gutter={[8]}>
            {/* col 1 */}
            <Col span={FORMLAYOUT.sameRow.body.labelCol.lg.span}>
              {/* profile picture */}
              <div style={{ textAlign: 'right' }}>
                <AccountChangeProfilePicture profile={profile} urlProfilePicture={urlProfilePicture} handleChangeProfilePictureUrl={handleChangeProfilePictureUrl}></AccountChangeProfilePicture>
              </div>
            </Col>
            {/* col 2 */}
            <Col span={FORMLAYOUT.sameRow.body.wrapperCol.lg.span}>
              {/* username */}
              <div>
                <Typography.Text style={{ fontSize: 24 }}>
                  <em>{profile.username}</em>
                </Typography.Text>
              </div>
              {/* name */}
              <div>
                <Typography.Text strong style={{ fontSize: 18 }}>
                  {profile.name}
                </Typography.Text>
              </div>
            </Col>
          </Row>
          {/* space */}
          <br></br>
          {/* department */}
          <CmpDetail label='Department' value={profile.department?.name}></CmpDetail>
          {/* position */}
          <CmpDetail label='Position' value={profile.position?.name}></CmpDetail>
          {/* joined on */}
          <CmpDetail label='Joined on' value={convertIsoDateToMoment(profile.create_date)}></CmpDetail>
          {/* project list */}
          <Divider>My Project</Divider>
        </Spin>
      </Col>
      {/* preferences */}
      <Col span={14}>
        {/* user preferences */}
        <Divider>
          <SettingOutlined></SettingOutlined> Preferences
        </Divider>
        <Spin spinning={isPreferencesLoading}></Spin>
        {/* about this application */}
        {/* (this project is inspired by ...) */}
      </Col>
    </Row>
  );
};

export default PgAccount;
