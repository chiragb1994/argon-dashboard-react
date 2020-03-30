// const baseUrl = 'http://localhost';
const baseUrl = 'https://covidsos-api.thebangaloreguy.com';

const config = {
  volunteerEndpoint: baseUrl + '/create_volunteer',
  requestEndpoint: baseUrl + '/create_request',
  orgEndpoint: baseUrl + '/reachout_form',
  loginEndpoint: baseUrl + '/login',
  newUserEndpoint: baseUrl + '/new_user',
  mapEndpoint: baseUrl + '/map',
  mapAuthEndpoint: baseUrl + '/mapAuth',
  assignEndpoint: baseUrl + '/assign',
  accessTypeStorageKey: 'access_level',
  userNameStorageKey: 'username',
  userIdStorageKey: 'user_id',
  superuserAccessKey: 'superuser',
};

export default config;