// const baseUrl = 'http://localhost';
const baseUrl = 'https://covidsos-api.thebangaloreguy.com';

const config = {
  volunteerEndpoint: baseUrl + '/create_volunteer',
  requestEndpoint: baseUrl + '/create_request',
  orgEndpoint: baseUrl + '/reachout_form',
  loginEndpoint: baseUrl + '/login',
  registerEndpoint: baseUrl + '/register',
  mapEndpoint: baseUrl + '/map',
  mapAuthEndpoint: baseUrl + '/mapAuth',
  assignEndpoint: baseUrl + '/assign',
};

export default config;