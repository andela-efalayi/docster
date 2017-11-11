import Models from '../models';
import ServerConstants from '../../constants/ServerConstants';
import QueryConstants from '../../constants/QueryConstants';

import setPageMetaData from '../utils/setPageMetaData';

const Document = Models.Document;
const User = Models.User;
const attributes = ServerConstants.USER_ATTRIBUTES;

module.exports = {
  /**
   * Search documents in database
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  searchDocuments(req, res) {
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;
    return Document
      .findAndCountAll({
        where: {
            $or: {
              title: {
                $iLike: `%${req.query.q}%`
              },
            content: {
              $iLike: `%${req.query.q}%`
            }
          }
        },
        offset,
        limit
      }).then(documents => {
      if(documents.count === 0) {
        return res.status(404).send({
            message: 'No documents available'
          });
      } 
      const pageMetaData = setPageMetaData(documents.count,
        limit, offset); 
      return res.status(200).send({
          documents,
          pageMetaData,
          message: 'Search completed'
        });
    })
  },

  /**
   * Search users in database
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  searchUsers(req, res) {
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;
    return User
      .findAndCountAll({
        attributes,
        where: {
          $or: {
            fullName: {
              $iLike: `%${req.query.q}%`
            },
            userName: {
              $iLike: `%${req.query.q}%`
            }
          }
        },
        offset,
        limit
      })
      .then((users) => {
        if (users.count === 0) {
          return res.status(404).send({
            message: 'No users available'
          });
        }
        const pageMetaData = setPageMetaData(users.count,
        limit, offset); 
        return res.status(200).send({
          users,
          pageMetaData,
          message: 'Search completed'
        });
      });
  }
};
