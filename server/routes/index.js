import rolesController from '../controllers/role';
import userController from '../controllers/user';
import documentController from '../controllers/document';
import searchController from '../controllers/search';
import { authenticate, isAdmin } from '../auth/authenticate';

module.exports = (app) => {
  // Document routes
  app.delete('/documents/:documentId',
    authenticate, documentController.deleteDocument);
  app.get('/documents', authenticate,
    isAdmin, documentController.getAllDocuments);
  app.get('/documents/:documentId',
    authenticate, documentController.getDocumentById);
  app.post('/documents', authenticate, documentController.createDocument);
  app.put('/documents/:documentId',
    authenticate, documentController.updateDocument);

  // Role routes
  app.get('/roles', authenticate, isAdmin, rolesController.getAllRoles);
  app.get('/roles/:roleId', authenticate, isAdmin, rolesController.getRoleById);
  app.post('/roles', authenticate, isAdmin, rolesController.createRole);

  // Search routes
  app.get('/search/documents', authenticate, searchController.searchDocuments);
  app.get('/search/users', authenticate, searchController.searchUsers);

  // User routes
  app.delete('/users/:userId', userController.deleteUser);
  app.get('/users', authenticate, userController.getAllUsers); // admin rights
  app.get('/users/:userId', authenticate, userController.getUserById);
  app.get('/users/:userId/documents',
    authenticate, userController.getUserDocuments);
  app.post('/users/login', userController.authenticateUser);
  app.post('/users/logout', userController.logoutUser);
  app.post('/users', userController.createUser);
  app.put('/users/:userId', authenticate, userController.updateUser);
};
