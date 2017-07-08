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
    "database": "docster-test",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "logging": false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
