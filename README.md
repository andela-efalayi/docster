# Docster
This is a react-redux based Document Management System (DMS) designed to managed documents which 
are accessed as private, public, or role.

###### Features
- A user can create, and edit personal documents
- A user can view documents set as public
- A user can also view documents set as role provided, the user has the 
particular roleId set
- A user (as an admin) can view all documents, users, and roles in the database.

***
#### Technology
This application was developed purely with JavaScript using React and the Redux 
Architecture, NodeJs, Sequelize, and Express.

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
#### How to Contribute
I welcome any form of contribution. If you feel something can be done better or 
there's an issue that needs to be fixed
or you are just interested in a specific part of the project, but not sure where
 to begin, feel free to ask.
On the other hand if the contribution you wish to make has not been documented 
in an existing issue, please [create new issue](https://github.com/andela-efalayi/docster/issues/new) before submitting your [pull request](https://help.github.com/articles/about-pull-requests/).
Also, kindly follow the Pull Request decsription convention [here](https://github.com/andela-efalayi/docster/wiki/Pull-Request-Naming-and-Description-Convention)

***
#### Getting Started

- Clone the project from repository [github.com/andela-efalayi/asedeyhot-news](https://github.com/andela-efalayi/docster)
- In your terminal, cd into the cloned folder and run `npm install`. This installs all the app's dependencies.
- Run `npm start` in your terminal, open your browser, and type `localhost:2700`. This runs the application on your local machine.
- Alternatively, you can access the app on [asedeyhot-news.herokuapp.com](https://asedeyhot-news.herokuapp.com)

***
#### Running Tests
App view components and routes were tested using Jest, Mocha, and Chai. To tun the tests:
- cd into the cloned Docster folder
- Run `npm run mocha` in terminal. This runs the server test

***
##### License
[MIT](LICENSE.txt) © 2017 | [Esther Falayi](github.com/andela-efalayi/) | 
Andela, Nigeria
