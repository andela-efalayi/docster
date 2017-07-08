import Models from '../models';
import QueryConstants from '../../constants/QueryConstants';

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
        userId: req.body.userId
      })
      .then(newDocument => res.status(200).send({
        newDocument,
        message: 'Document was created successfuly'
      }))
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while creating document'
      }));
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
      .findAll({ offset, limit })
      .then((documents) => {
        if (documents.length === 0) {
          return res.status(404).send({
            message: 'No documents available'
          });
        }
        return res.status(200).send({
          documents,
          message: 'Retrieved all documents successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while retrieving documents.'
      }));
  },

  /**
   * Get all public documents from database
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getPublicDocuments(req, res) {
    return Document
      .findAll({ 
        where: {
          access: 'public'
        }
      })
      .then((documents) => {
        if (documents.length === 0) {
          return res.status(404).send({
            message: 'No documents available'
          });
        }
        return res.status(200).send({
          documents,
          message: 'Retrieved all documents successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while retrieving documents.'
      }));
  },

  /**
   * Get all role documents
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getRoleDocuments(req, res) {
    return Document
      .findAll({ 
        where: {
          access: 'role'
        }
      })
      .then((documents) => {
        if (documents.length > 0) {
          return res.status(200).send({
          documents,
          message: 'Retrieved all documents successfully'
        });
        }
        return res.status(404).send({
            message: 'No documents availablessss'
          });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while retrieving documents.'
      }));
  },

  /**
   * Get a document by Id
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getDocumentById(req, res) {
    if (isNaN(req.params.documentId) === false) {
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
          message: 'Document was retrieved successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message:
        `An error occurred while retrieving this document: ${req.params.option}`
      }));
    }
    return res.status(400).send({
      message: 'Invalid parameter detected'
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
            message:
            `Document: ${documentWithUpdate.title} was updated successfully`
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while fetching document'
      }));
  },

  /**
   * Delete a document
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  deleteDocument(req, res) {
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
            message: 'Document was deleted successfully'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message:
        `An error occurred while fetching document: ${req.params.documentId}`
      }));
  }
};
