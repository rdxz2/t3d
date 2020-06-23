import React from 'react';

import HTTPMETHOD from '../constants/HTTPMETHOD';
import CtxApi from '../contexts/ctxApi';
import { makeNameInitials } from '../utilities/utlType';
import CmpMiniProfile from './cmpMiniProfile';
import { Spin } from 'antd';

const CmpMiniProfileAsync = ({ userId }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // loading state
  const [isLoading, isLoadingSet] = React.useState(true);

  // profile
  const [profile, profileSet] = React.useState([]);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = async () => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/user/profileminimal/${userId}`, HTTPMETHOD.GET);

      // set profile
      profileSet(response.data);

      // not loading...
      isLoadingSet(false);
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useState(() => {
    prepareInitialData();
  }, []);

  // END -- EFFECTS

  // make name initials
  const nameInitials = makeNameInitials(profile.name);

  return (
    <Spin spinning={isLoading}>
      <CmpMiniProfile profile={profile} nameInitials={nameInitials}></CmpMiniProfile>
    </Spin>
  );
};

export default CmpMiniProfileAsync;
