// send http request (fetch)
export const sendHttpRequest = async (url, method, body, headers = {}) => {
  try {
    // send request
    const response = await fetch(url, {
      method: method,
      body: body,
      headers: headers,
    });

    // translate json string to object
    const responseJson = await response.json();

    // set http status to be evaluated by the corresponding caller
    responseJson.status = response.status;

    // return server response
    return responseJson;
  } catch (error) {
    console.error('got error from http request', error);
    throw error;
  }
};
