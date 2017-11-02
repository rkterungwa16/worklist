/**
 * Helper function to configure headers for api call
 * @param  {*} null
 * @return {object} the server response
 */

const axiosConfig = (token) => {
  let config = {};
  if (token) {
    config = {
      headers: { 'x-access-token': token }
    };
    return config;
  }
  return null;
};

export default axiosConfig;
