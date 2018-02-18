const nconf = require('nconf');

const defaults = {
  NODE_ENV: 'development',
  DIST_ROOT: 'dist',
};

nconf
  .file('config.json')
  .argv()
  .env()
  .defaults(defaults);

const NODE_ENV = nconf.get('NODE_ENV');

Object.assign(defaults, 
  NODE_ENV === 'production' 
  ? require('./env.prod')
  : require('./env.dev'));

module.exports = nconf;