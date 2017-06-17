import rolesController from '../controllers/role';
import userController from '../controllers/user';
import documentController from '../controllers/document';

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
    .send({
      message: 'Welcome to Docster Document Management System.'
    });
  });

  // Routes for roles
  app.post('/roles', rolesController.createRole);
  app.get('/roles', rolesController.getAllRoles);
  app.get('/roles/:roleId', rolesController.getRoleById);

  // Routes for users
  app.post('/users', userController.createUser);
  app.get('/users', userController.getAllUsers);
  app.get('/users/:userId', userController.getUserById);
  app.put('/users/:userId', userController.updateUser);
  app.delete('/users/:userId', userController.deleteUser);

  // Routes for documents
  app.post('/documents', documentController.createDocument);
  app.get('/documents', documentController.getAllDocuments);
  app.get('/documents/:documentId', documentController.getDocumentById);
  app.put('/documents/:documentId', documentController.updateDocument);
  app.delete('/documents/:documentId', documentController.deleteDocument);
};
