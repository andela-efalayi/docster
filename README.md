[![Build Status](https://travis-ci.org/andela-efalayi/docster.svg?branch=feedback-branch)](https://travis-ci.org/andela-efalayi/docster) [![Coverage Status](https://coveralls.io/repos/github/andela-efalayi/docster/badge.svg?branch=bug%2Ffix-travis-error)](https://coveralls.io/github/andela-efalayi/docster?branch=staging)

## Docster
This is a react-redux based Document Management System (DMS) designed to manage text documents which 
are can be accessed as private, public, or role.

###### Features
- A user can create, and edit personal documents
- A user can view documents set as public
- A user can also view documents set as role, provided the user has the roleId set on the document
- A user (as an admin) can view all documents, users, and roles in the database.

***
#### Technology
This application was developed purely with JavaScript using React and the Redux 
Architecture, NodeJs, Sequelize (ORM), and Express.

###### Dependencies
- [Babel](https://babeljs.io/)
- [Material-UI](http://www.material-ui.com/#/)
- [React](https://facebook.github.io/react/)
- [React-dom](https://www.npmjs.com/package/react-dom)
- [React-router-dom](https://www.npmjs.com/package/react-router-dom)
- [React-redux](http://redux.js.org/)
- [Sequelize](http://docs.sequelizejs.com/)
- [Postgres](https://www.postgresql.org/docs/9.6/static/tutorial-createdb.html)

***
#### Getting Started
- Clone the project from repository [https://github.com/andela-efalayi/docster](https://github.com/andela-efalayi/docster)
- In your terminal, change directory to the cloned folder and run `npm install`. This installs all the app's dependencies.
- Run `npm start` in your terminal, open your browser, and type `localhost:2700`. This runs the application on your local machine.
- Alternatively, you can access the app on [docster-dms.herokuapp.com](https://docster-dms.herokuapp.com/)

#### Testing
Server modules were tested using Mocha while client modules were tested using Jest and Enzyme.

###### NPM Scripts
To make development easier, some NPM scripts were written:
- `npm run reset:db` resets database
- `npm run server:test` runs test for server modules using Mocha
- `npm run client:test` runs test for client modules using Jest
- `npm run e2e:test` runs end-to-end test
- `npm run start:dev` runs app on local machine


```
NOTE: It is advised that you have a different database for running your tests.
```
*** 
###### API Documentation
[API documentation](https://docster-dms.herokuapp.com/documentation/#introduction) was compiled using Slate.

***
#### Contribution
I welcome any form of contribution. If you feel something can be done better or 
there's an issue that needs to be fixed
or you are just interested in a specific part of the project, but not sure where
 to begin, feel free to ask.
On the other hand if the contribution you wish to make has not been documented 
in an existing issue, please [create new issue](https://github.com/andela-efalayi/docster/issues/new) before submitting your [pull request](https://help.github.com/articles/about-pull-requests/).
Also, kindly follow the Pull Request decsription convention [here](https://github.com/andela-efalayi/docster/wiki/Pull-Request-Naming-and-Description-Convention)

***
##### License
[MIT](LICENSE.txt) © 2017 | [Esther Falayi](github.com/andela-efalayi/) | 
Andela, Nigeria
