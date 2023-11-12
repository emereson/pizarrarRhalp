export const environments = {
  development: 'development',
  production: 'production'
};

export const currentEnvironment = process.env.NODE_ENV;

let apiURL = '';
const AWS_LOAD_BALANCER = 'https://loadbalancer.branak.net/';

switch (currentEnvironment) {
  case environments.development:
    apiURL = 'http://localhost:8181/';
    break;
  case environments.production:
    apiURL = AWS_LOAD_BALANCER;
    break;
  default:
    apiURL = AWS_LOAD_BALANCER;
}

const roomID = 465;
const techerPassword = 'yrs338ujrkl';

export default {
  apiURL,
  roomID,
  techerPassword
};
