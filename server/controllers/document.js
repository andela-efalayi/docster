/* eslint-disable no-console*/
import colors from 'colors';
import Models from '../models';
import QueryConstants from '../../constants/QueryConstants';

const Document = Models.Document;
// const User = Models.User;

module.exports = {
  createDocument(req, res) {
    console.log(colors.yellow('Creating document...'));
    return Document
      .create({
        title: req.body.title,
        slug: req.body.title,
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
          message: 'Retrieved all docuemnts successfully.'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while retrieving documents.'
      }));
  },
  getDocumentById(req, res) {
    console.log(colors.yellow('Fetching documents from database...'));
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          res.status(404).send({
            message: 'Document not found.'
          });
        }
        res.status(200).send({
          document,
          message: 'Document was retrieved successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: `An error occurred while retrieving this document: ${req.params.option}`
      }));
  },
  updateDocument(req, res) {
    console.log(colors.yellow('Updating dodcument...'));
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          res.status(404).send({
            message: 'Document not found'
          });
        }
        return document
          .update(req.body)
          .then(documentWithUpdate => res.status(201).send({
            documentWithUpdate,
            message: `Document: ${documentWithUpdate.title} was updated successfully`
          }))
          .catch(() => res.status(400).send({
            message: `An error occurred while updating document: ${document.id}`
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An while fetching document'
      }));
  },
  deleteDocument(req, res) {
    console.log(colors.red(`Deleting document: ${req.body.documentId}...`));
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          res.status(404).send({
            message: 'Document not found.'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({
            message: `Document: ${req.params.documentId} was deleted successfully.`
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: `An error occurred while fetching document: ${req.params.documentId}`
      }));
  }
};
