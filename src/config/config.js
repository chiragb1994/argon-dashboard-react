// const baseUrl = 'http://localhost';
const baseUrl = 'https://covidsos-api.thebangaloreguy.com';

const config = {
  volunteerEndpoint: baseUrl + '/create_volunteer',
  requestEndpoint: baseUrl + '/create_request',
  orgEndpoint: baseUrl + '/reachout_form',
  loginEndpoint: baseUrl + '/login',
  newUserEndpoint: baseUrl + '/new_user',
  summaryEndpoint: baseUrl + '/top_ticker',
  mapEndpoint: baseUrl + '/public_map_data',
  mapAuthEndpoint: baseUrl + '/private_map_data',
  assignEndpoint: baseUrl + '/assign',

  accessTypeStorageKey: 'access_level',
  userNameStorageKey: 'username',
  userIdStorageKey: 'user_id',
  superuserAccessKey: 'superuser',
};

export default config;