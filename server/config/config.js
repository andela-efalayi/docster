const dotenv = require('dotenv');

dotenv.config();

module.exports = {
 development: {
    "username": "estherfalayi",
    "password": "esther",
    "database": "docster",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "logging": false 
  },
  test: {
    "use_env_variable": "TESTDB_URL",
    "dialect": "postgres",
    "logging": false    
  },
  production: {
    "use_env_variable": "TESTDB_URL",
    "dialect": "postgres"
  }
};
