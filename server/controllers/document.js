/* eslint-disable no-console*/
import colors from 'colors';
import Models from '../models';
import QueryConstants from '../../constants/QueryConstants';

const Document = Models.Document;

module.exports = {
  createDocument(req, res) {
    console.log(colors.yellow('Creating document...'));
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
  getAllDocuments(req, res) {
    console.log(colors.yellow('Fetching all documents...'));
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;
    return Document
      .findAll({ offset, limit })
      .then((documents) => {
        res.status(200);
        if (documents.length === 0) {
          res.send({
            message: 'No documents available'
          });
        }
        res.send({
          documents,
          message: 'Retrieved all documents successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while retrieving documents.'
      }));
  },
  getPublicDocuments(req, res) {
    console.log(colors.yellow('Fetching public documents...'));
    return Document
      .findAll({ 
        where: {
          access: 'public'
        }
      })
      .then((documents) => {
        res.status(200);
        if (documents.length === 0) {
          res.send({
            message: 'No documents available'
          });
        }
        res.send({
          documents,
          message: 'Retrieved all documents successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while retrieving documents.'
      }));
  },
  getRoleDocuments(req, res) {
    console.log(colors.yellow('Fetching public documents...'));
    return Document
      .findAll({ 
        where: {
          access: 'role'
        }
      })
      .then((documents) => {
        res.status(200);
        if (documents.length === 0) {
          res.send({
            message: 'No documents available'
          });
        }
        res.send({
          documents,
          message: 'Retrieved all documents successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while retrieving documents.'
      }));
  },
  getDocumentById(req, res) {
    console.log(colors.yellow('Fetching documents from database...'));
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
  updateDocument(req, res) {
    console.log(colors.yellow('Updating document...'));
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
  deleteDocument(req, res) {
    console.log(colors.red(`Deleting document: ${req.params.documentId}...`));
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
