import rolesController from '../controllers/role';
import userController from '../controllers/user';
import documentController from '../controllers/document';
import searchController from '../controllers/search';
import { authenticate, isAdmin } from '../auth/authenticate';
import { validateNewDocument, validateNewUser } from '../utils/validate';
import setDocumentSlug from '../utils/update';
import checkID from '../utils/checkID';

module.exports = (app) => {
  // Document routes
  app.delete('/api/v1/documents/:id',
    authenticate, checkID, documentController.deleteDocument);

  app.get('/api/v1/documents', authenticate,
    isAdmin, documentController.getAllDocuments);

  app.get('/api/v1/documents/:id',
    authenticate, checkID, documentController.getDocumentById);

  app.get('/api/v1/public-documents',
    authenticate, documentController.getPublicDocuments);

  app.get('/api/v1/role-documents',
  authenticate, documentController.getRoleDocuments);

  app.post('/api/v1/documents',
  authenticate, validateNewDocument, documentController.createDocument);

  app.put('/api/v1/documents/:id',
    authenticate, checkID, setDocumentSlug, documentController.updateDocument);

  // Role routes
  app.get('/api/v1/roles', authenticate,
  isAdmin, rolesController.getAllRoles);

  app.get('/api/v1/roles/:id', authenticate,
  isAdmin, checkID, rolesController.getRoleById);

  app.post('/api/v1/roles', authenticate,
  isAdmin, rolesController.createRole);

  // Search routes
  app.get('/api/v1/search/documents',
  authenticate, searchController.searchDocuments);

  app.get('/api/v1/search/users',
  authenticate, searchController.searchUsers);

  // User routes
  app.delete('/api/v1/users/:id', authenticate,
  isAdmin, checkID, userController.deleteUser);

  app.get('/api/v1/users', authenticate, isAdmin,
  userController.getAllUsers); // admin rights

  app.get('/api/v1/users/:id',
  authenticate, checkID, userController.getUserById);

  app.get('/api/v1/users/:id/documents',
    authenticate, checkID, userController.getUserDocuments);

  app.post('/api/v1/users/login', userController.authenticateUser);

  app.post('/api/v1/users/logout', userController.logoutUser);

  app.post('/api/v1/users', validateNewUser, userController.createUser);

  app.put('/api/v1/users/:id',
  authenticate, checkID, userController.updateUser);
};
