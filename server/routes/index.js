import rolesController from '../controllers/role';
import userController from '../controllers/user';
import documentController from '../controllers/document';
import searchController from '../controllers/search';

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
    .send({
      message: 'Welcome to Docster Document Management System.'
    });
  });

  // Document routes
  app.delete('/documents/:documentId', documentController.deleteDocument);
  app.get('/documents', documentController.getAllDocuments);
  app.get('/documents/:documentId', documentController.getDocumentById);
  app.post('/documents', documentController.createDocument);
  app.put('/documents/:documentId', documentController.updateDocument);

  // Role routes
  app.get('/roles', rolesController.getAllRoles);
  app.get('/roles/:roleId', rolesController.getRoleById);
  app.post('/roles', rolesController.createRole);

  // Search routes
  app.get('/search/documents', searchController.searchDocuments);
  app.get('/search/users', searchController.searchUsers);

  // User routes
  app.delete('/users/:userId', userController.deleteUser);
  app.get('/users', userController.getAllUsers);
  app.get('/users/:userId', userController.getUserById);
  app.get('/users/:userId/documents', userController.getUserDocuments);
  app.post('/users', userController.createUser);
  app.put('/users/:userId', userController.updateUser);
};
