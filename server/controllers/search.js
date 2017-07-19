import Models from '../models';
import ServerConstants from '../../constants/ServerConstants';

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
        }
      }).then(documents => {
      if(documents.count === 0) {
        return res.status(404).send({
            message: 'No documents available'
          });
      } 
      return res.status(200).send({
          documents,
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
    return User
      .findAndCountAll({
        attributes,
        where: {
          $or: [
            {
              fullName: {
                $iLike: `%${req.query.q}%`
              }
            },
            {
              userName: {
                $iLike: `%${req.query.q}%`
              }
            }
          ],
        }
      })
      .then((users) => {
        if (users.count === 0) {
          return res.status(404).send({
            message: 'No users available'
          });
        }
        return res.status(200).send({
          users,
          message: 'Search completed'
        });
      });
  }
};
