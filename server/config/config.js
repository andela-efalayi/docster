const dotenv = require('dotenv');

dotenv.config();

module.exports = {
 development: {
    "username": "estherfalayi",
    "password": "esther",
    "database": "docster",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  test: {
    "username": "estherfalayi",
    "password": "esther",
    "database": "docster",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
// {
//   "development": {
//     "username": "estherfalayi",
//     "password": "esther",
//     "database": "docster",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "estherfalayi",
//     "password": "esther",
//     "database": "docster",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": "docster-admin",
//     "password": "admin@docster",
//     "database": "docster",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   }
// }