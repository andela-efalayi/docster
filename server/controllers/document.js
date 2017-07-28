import Models from '../models';
import QueryConstants from '../../constants/QueryConstants';
import setPageMetaData from '../utils/setPageMetaData';

const Document = Models.Document;
module.exports = {

  /**
   * Create a new document
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  createDocument(req, res) {
    return Document
      .create({
        title: req.body.title,
        slug: req.body.slug || req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.currentUser.id
      })
      .then(newDocument => res.status(200).send({
        newDocument,
        message: 'Document created'
      }))
      .catch((error) => {
        const errorMessage = error.errors[0].message;
        return res.status(400).send({
          errorMessage
        });
      });
  },

  /**
   * Get all docuemnts from database
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getAllDocuments(req, res) {
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;
    return Document
      .findAndCountAll({ offset, limit })
      .then((documents) => {
        if (documents.count === 0) {
          return res.status(200).send({
            message: 'No documents available'
          });
        }
      const pageMetaData = setPageMetaData(documents.count,
        limit, offset);        
        return res.status(200).send({
          documents,
          pageMetaData,
          message: 'All documents retrieved'
        });
      });
  },

  /**
   * Get all public documents from database
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getPublicDocuments(req, res) {
    return Document
      .findAndCountAll({ 
        where: {
          access: 'public'
        }
      })
      .then((documents) => {
        if (documents.count === 0) {
          return res.status(200).send({
            message: 'No public documents available'
          });
        }
        
        return res.status(200).send({
          documents,
          message: 'Public documents retrieved'
        });
      });
  },

  /**
   * Get all role documents
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getRoleDocuments(req, res) {
    return Document
      .findAndCountAll({ 
        where: {
          access: 'role'
        }
      })
      .then((documents) => {
        if (documents.count === 0) {
          return res.status(200).send({
            message: 'No role documents available'
          });
        }
        return res.status(200).send({
          documents,
          message: 'Role documents retrieved'
        });
      });
  },

  /**
   * Get a document by Id
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getDocumentById(req, res) {
    if (isNaN(req.params.documentId) === true) {
      return res.status(400).send({
        message: 'DocumentId must be numeric'
      });
    }
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found'
          });
        }
        return res.status(200).send({
          document,
          message: 'Document retrieved'
        });
      });
  },

  /**
   * Update a document
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  updateDocument(req, res) {
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found'
          });
        }
        return document
          .update(req.body)
          .then(documentWithUpdate => res.status(201).send({
            documentWithUpdate,
            message: 'Document updated'
          }));
      });
  },

  /**
   * Delete a document
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  deleteDocument(req, res) {
    if(isNaN(req.params.documentId) === true) {
      return res.status(400).send({
        message: 'DocumentId must be numeric'
      });
    }
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({
            message: 'Document deleted'
          }));
      });
  }
};
