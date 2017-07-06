const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "docster-admin",
    "password": "admin@docster",
    "database": "docster",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
};