import rolesController from '../controllers/role';
import userController from '../controllers/user';
import documentController from '../controllers/document';
import searchController from '../controllers/search';
import { authenticate, isAdmin } from '../auth/authenticate';

module.exports = (app) => {
  // Document routes
  app.delete('/docster/api/v1/documents/:documentId',
    authenticate, documentController.deleteDocument);
  app.get('/docster/api/v1/documents', authenticate,
    isAdmin, documentController.getAllDocuments);
  app.get('/docster/api/v1/documents/:documentId',
    authenticate, documentController.getDocumentById);
  app.get('/docster/api/v1/public-documents',
    authenticate, documentController.getPublicDocuments);
  app.get('/docster/api/v1/role-documents',
  authenticate, documentController.getRoleDocuments);

  app.post('/docster/api/v1/documents',
  authenticate, documentController.createDocument);
  app.put('/docster/api/v1/documents/:documentId',
    authenticate, documentController.updateDocument);

  // Role routes
  app.get('/docster/api/v1/roles', authenticate,
  isAdmin, rolesController.getAllRoles);
  app.get('/docster/api/v1/roles/:roleId', authenticate,
  isAdmin, rolesController.getRoleById);
  app.post('/docster/api/v1/roles', authenticate,
  isAdmin, rolesController.createRole);

  // Search routes
  app.get('/docster/api/v1/search/documents',
  authenticate, searchController.searchDocuments);
  app.get('/docster/api/v1/search/users',
  authenticate, searchController.searchUsers);

  // User routes
  app.delete('/docster/api/v1/users/:userId', authenticate,
  isAdmin, userController.deleteUser);
  app.get('/docster/api/v1/users', authenticate, isAdmin,
  userController.getAllUsers); // admin rights
  app.get('/docster/api/v1/users/:userId',
  authenticate, userController.getUserById);
  app.get('/docster/api/v1/users/:userId/documents',
    authenticate, userController.getUserDocuments);
  app.post('/docster/api/v1/users/login', userController.authenticateUser);
  app.post('/docster/api/v1/users/logout', userController.logoutUser);
  app.post('/docster/api/v1/users', userController.createUser);
  app.put('/docster/api/v1/users/:userId',
  authenticate, userController.updateUser);
};
