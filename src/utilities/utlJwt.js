import decode from 'jwt-decode';

// get jwt from local storage
export const getJwt = (key) => localStorage.getItem(key);

// set jwt to local storage
export const setJwt = (key, jwt) => {
  if (jwt) localStorage.setItem(key, jwt);
};

// remove jwt from local storage
export const removeJwt = (key) => localStorage.removeItem(key);

// check if jwt is expired
export const isJwtExpired = (key) => {
  const jwt = getJwt(key);

  // jwt is not exist
  if (!jwt) return true;

  const jwtInfo = getJwtInfo(jwt);

  // jwt is expired
  return jwtInfo.exp <= Date.now() / 1000;
};

// get jwt stored information
export const getJwtInfo = (jwt) => (jwt ? decode(jwt) : {});
