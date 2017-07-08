## Docster
This is a react-redux based Document Management System (DMS) designed to managed text documents which 
are can be accessed as private, public, or role.

###### Features
- A user can create, and edit personal documents
- A user can view documents set as public
- A user can also view documents set as role provided, the user has the roleId set on the document
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
- Clone the project from repository [github.com/andela-efalayi/asedeyhot-news](https://github.com/andela-efalayi/docster)
- In your terminal, cd into the cloned folder and run `npm install`. This installs all the app's dependencies.
- Run `npm start` in your terminal, open your browser, and type `localhost:2700`. This runs the application on your local machine.
- Alternatively, you can access the app on [docster-dms.herokuapp.com](https://docster-dms.herokuapp.com/)

##### NPM Scripts
To make development easier, some NPM scripts were written:
- `npm run reset:db` undos all database migrations
- `npm run seed:all` migrates database tables and seeds data
- `npm run fill:db` chains two scripts: `npm run reset:db` and `npm run seed:all`
- `npm run mocha` runs mocha test for server
- `npm run server-test` chains two scripts: `npm run fill:db` and `npm run mocha`

##### Running Tests
Application view components and routes were tested using Jest, Mocha, and Chai. To tun the tests:
- cd into the cloned Docster folder
- Run `npm run server-test` in terminal. This runs the server test
*NOTE*: It is advised that you have a different database for running your tests.

*** 
#### API Documentation
| Endpoint                                          | Functionality                                   |
| ------------------------------------------------- |:-----------------------------------------------:|
| POST /users/login  | logs user in                 |                                                 |
| POST /users/logout                                | logs user out                                   |
| POST /users                                       | creates a new user                              |
| GET /users                                        | finds matching instances of a user              |
| GET /users/?limit={integer}&offset={integer}      | pagination for users                            |
| GET /users/id                                     | finds a particular user                         |
| PUT /users/id                                     | updates a particular user's attributes          |
| DELETE /users/id                                  | deletes a particular user                       |
| POST /documents/                                  | creates a new document                          |
| GET /documents/                                   | finds matching instances of documents           |
| POST /documents/                                  | creates a new document                          |
| GET /documents/?limit={integer}&offset={integer}  | pagination for documents                        |
| GET /documents/id                                 | finds a particular document                     |
| PUT /documents/id                                 | updates a particular document's attributes      |
| GET /users/id/documents                           | finds all documents that belong to a user       | 
| GET /search/users/?q={}                           | searches for a user                             |
| GET /search/documents/?q={doctitle}               | searches for a document                         |

***
#### How to Contribute
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
