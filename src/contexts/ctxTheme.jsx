import React from 'react';

import LOCALSTORAGESTRING from '../constants/LOCALSTORAGESTRING';
import themeVarsDark from '../theme-dark.json';
import themeVarsLight from '../theme-light.json';

const CtxTheme = React.createContext({
  isDarkTheme: false,
  handleChangeDarkTheme: (isDarkTheme = false) => false,
  handleToggleDarkTheme: () => false,
  handleChangeThemePrimaryColor: (isDarkTheme = false, color = '') => {},
  handleGetLocalStorageDarkTheme: () => false,
  handleGetLocalStorageLightThemePrimaryColor: () => '',
  handleGetLocalStorageDarkThemePrimaryColor: () => '',
  handleSetLocalStorageLightThemePrimaryColor: (color = '') => {},
  handleSetLocalStorageDarkThemePrimaryColor: (color = '') => {},
});

export const CtxPvdTheme = ({ children }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // get dark theme mode from local storage
  const handleGetLocalStorageDarkTheme = React.useCallback(() => localStorage.getItem(LOCALSTORAGESTRING.STR_LSTG_DARKTHEME) === 'true' || false, []);

  // END -- OTHERS

  // START -- STATES

  // dark theme state
  const [isDarkTheme, isDarkThemeSet] = React.useState(handleGetLocalStorageDarkTheme());

  // END -- STATES

  // START -- FUNCTIONS

  // get theme primary color from local storage
  const handleGetLocalStorageLightThemePrimaryColor = React.useCallback(() => localStorage.getItem(LOCALSTORAGESTRING.STR_LSTG_LIGHTTHEME_COLORPRIMARY), []);
  const handleGetLocalStorageDarkThemePrimaryColor = React.useCallback(() => localStorage.getItem(LOCALSTORAGESTRING.STR_LSTG_DARKTHEME_COLORPRIMARY), []);

  // set theme primary color to local storage
  const handleSetLocalStorageLightThemePrimaryColor = React.useCallback((color) => localStorage.setItem(LOCALSTORAGESTRING.STR_LSTG_LIGHTTHEME_COLORPRIMARY, color || ''), []);
  const handleSetLocalStorageDarkThemePrimaryColor = React.useCallback((color) => localStorage.setItem(LOCALSTORAGESTRING.STR_LSTG_DARKTHEME_COLORPRIMARY, color || ''), []);

  // change dark theme
  const handleChangeDarkTheme = React.useCallback((_isDarkTheme, _lightThemePrimaryColor, _darkThemePrimaryColor) => {
    // final result
    let newIsDarkTheme;

    // set state
    isDarkThemeSet((__isDarkTheme) => {
      // toggling mode
      const isToggling = _isDarkTheme === null;

      // if parameter is null then toggle
      const ___isDarkTheme = isToggling ? !__isDarkTheme : _isDarkTheme;

      // set final result
      newIsDarkTheme = ___isDarkTheme;

      // set state
      return ___isDarkTheme;
    });

    // set local storage
    localStorage.setItem(LOCALSTORAGESTRING.STR_LSTG_DARKTHEME, newIsDarkTheme);

    // START -- CONFIGURE NEW THEME VARS

    // configure new theme vars & its primary color (use default if primary color not defined)
    let newThemeVars = {};
    if (newIsDarkTheme) {
      // get theme vars from generated configuration file
      newThemeVars = { ...themeVarsDark };

      // set theme primary color
      if (_darkThemePrimaryColor) newThemeVars['@primary-color'] = _darkThemePrimaryColor;
    } else {
      // get theme vars from generated configuration file
      newThemeVars = { ...themeVarsLight };

      // set theme primary color
      if (_lightThemePrimaryColor) newThemeVars['@primary-color'] = _lightThemePrimaryColor;
    }

    // END -- CONFIGURE NEW THEME VARS

    // change global dark theme with its own primary color
    window.less
      .modifyVars(newThemeVars)
      .then(() => {})
      .catch((err) => console.error(err));

    // set main content class
    const elMain = document.getElementsByClassName('content-main')[0];
    if (elMain) newIsDarkTheme ? elMain.classList.add('dark') : elMain.classList.remove('dark');

    return newIsDarkTheme;
  }, []);

  // prepare initial data
  const prepareInitialData = React.useCallback(() => {
    const _isDarkTheme = handleGetLocalStorageDarkTheme();

    handleChangeDarkTheme(_isDarkTheme, handleGetLocalStorageLightThemePrimaryColor(), handleGetLocalStorageDarkThemePrimaryColor());
  }, [handleChangeDarkTheme, handleGetLocalStorageDarkTheme, handleGetLocalStorageDarkThemePrimaryColor, handleGetLocalStorageLightThemePrimaryColor]);

  // toggle dark theme
  const handleToggleDarkTheme = React.useCallback(() => {
    return handleChangeDarkTheme(null, handleGetLocalStorageLightThemePrimaryColor(), handleGetLocalStorageDarkThemePrimaryColor());
  }, [handleChangeDarkTheme, handleGetLocalStorageDarkThemePrimaryColor, handleGetLocalStorageLightThemePrimaryColor]);

  // change theme primary color
  const handleChangeThemePrimaryColor = React.useCallback(
    (_isDarkTheme, color) => {
      handleChangeDarkTheme(_isDarkTheme, !_isDarkTheme && color, _isDarkTheme && color);
    },
    [handleChangeDarkTheme]
  );

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    prepareInitialData();
  }, [prepareInitialData]);

  // END -- EFFECTS

  return (
    <CtxTheme.Provider
      value={{
        isDarkTheme,
        handleChangeDarkTheme,
        handleToggleDarkTheme,
        handleChangeThemePrimaryColor,
        handleGetLocalStorageDarkTheme,
        handleGetLocalStorageLightThemePrimaryColor,
        handleGetLocalStorageDarkThemePrimaryColor,
        handleSetLocalStorageLightThemePrimaryColor,
        handleSetLocalStorageDarkThemePrimaryColor,
      }}>
      {children}
    </CtxTheme.Provider>
  );
};

export default CtxTheme;
