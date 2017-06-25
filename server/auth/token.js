import jwt from 'jsonwebtoken';

const secret = process.env.API_SECRET || 'temporarysecret';

/** Generate jwt token
 * @param {object} user 
 * @returns {string} token
 */
export function generateToken(user) {
  return jwt.sign({
    data: {
      id: user.id,
      userName: user.userName,
      roleId: user.roleId
    }
  },
  secret,
  {
    expiresIn: '24h'
  });
}
 
/**
 * Verify jwt token
 * @param {string} token 
 * @returns {bool} verification
 */
export function verifyToken (token) {
  var verificationPromise = new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => {
      resolve(decoded);
    });
  });
  return verificationPromise;
}