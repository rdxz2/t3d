import { Space } from 'antd';
import React from 'react';
import { CirclePicker } from 'react-color';

import CmpDetail from '../../components/cmpDetail';
import { SET_BG_DARK, SET_BG_LIGHT } from '../../constants/COLOR';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import CtxApi from '../../contexts/ctxApi';
import CtxTheme from '../../contexts/ctxTheme';

const AccountPreferences = ({ preferences = {} }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // theme
  const { isDarkTheme, handleChangeDarkTheme, handleSetLocalStorageLightThemePrimaryColor, handleSetLocalStorageDarkThemePrimaryColor } = React.useContext(CtxTheme);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // light theme primary color
  const [lightThemePrimaryColor, lightThemePrimaryColorSet] = React.useState('');
  const [isChangingLightThemePrimaryColorFromProp, isChangingLightThemePrimaryColorFromPropSet] = React.useState(true);

  // dark theme primary color
  const [darkThemePrimaryColor, darkThemePrimaryColorSet] = React.useState('');
  const [isChangingDarkThemePrimaryColorFromProp, isChangingDarkThemePrimaryColorFromPropSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // light theme primary color changed
  const handleChangeLightThemePrimaryColor = async (color) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest('api/preferences/primarylight', HTTPMETHOD.POST, { color: color.hex });

      // set state
      lightThemePrimaryColorSet(response.data);

      // set new color to local storage
      handleSetLocalStorageLightThemePrimaryColor(color.hex);

      // change primary color immediately if theme is the same
      if (!isDarkTheme) handleChangeDarkTheme(false, color.hex);
    } catch (error) {}
  };

  // dark theme primary color changed
  const handleChangeDarkThemePrimaryColor = async (color) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest('api/preferences/primarydark', HTTPMETHOD.POST, { color: color.hex });

      // set state
      darkThemePrimaryColorSet(response.data);

      // set new color to local storage
      handleSetLocalStorageDarkThemePrimaryColor(color.hex);

      // change primary color immediately if theme is the same
      if (isDarkTheme) handleChangeDarkTheme(true, null, color.hex);
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // only change light theme primary color from prop on initialization
    if (isChangingLightThemePrimaryColorFromProp && preferences.color_primary_light) {
      lightThemePrimaryColorSet(preferences.color_primary_light);

      isChangingLightThemePrimaryColorFromPropSet(false);
    }

    // only change dark theme primary color from prop on initialization
    if (isChangingDarkThemePrimaryColorFromProp && preferences.color_primary_dark) {
      darkThemePrimaryColorSet(preferences.color_primary_dark);

      isChangingDarkThemePrimaryColorFromPropSet(false);
    }
  }, [isChangingDarkThemePrimaryColorFromProp, isChangingLightThemePrimaryColorFromProp, preferences.color_primary_dark, preferences.color_primary_light]);

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* light theme primary color */}
      <CmpDetail label='Light theme primary color' value={<CirclePicker color={lightThemePrimaryColor} colors={SET_BG_LIGHT} onChange={handleChangeLightThemePrimaryColor}></CirclePicker>}></CmpDetail>
      {/* dark theme primary color */}
      <CmpDetail label='Dark theme primary color' value={<CirclePicker color={darkThemePrimaryColor} colors={SET_BG_DARK} onChange={handleChangeDarkThemePrimaryColor}></CirclePicker>}></CmpDetail>
    </Space>
  );
};

export default AccountPreferences;
