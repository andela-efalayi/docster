import * as auth from './token';

/**
 * Check if request has an authorisation header
 * @param {object} req 
 * @param {object} res 
 * @param {func} next 
 * @returns {void}
 */
export function authenticate(req, res, next) {
  let token;
  const authorisationHeader = req.headers['authorisation'];

  if (authorisationHeader) {
    token = authorisationHeader.split(" ")[1];
  }
  if (token) {
    auth.verifyToken(token)
      .then(decoded => {
        req.currentUser = decoded.data;
        next();
      });
  } else {
    res.status(403).send({
      message: 'No token provided'
    });
  }
}

/**
 * Check if request from admin
 * @param {object} req 
 * @param {object} res 
 * @param {func} next 
 * @returns {void}
 */
export function isAdmin (req, res, next) {
  if (req.currentUser.roleId === 1) {
    next();
  } else {
    res.status(403).send({
      message: 'User is not an admin'
    });
  }
}