import jwt from 'jsonwebtoken';

/**
 * Decode jwt token
 * @param {string} token 
 * @returns {object} decoded token data
 */
export default function decodeToken(token) {
  return jwt.decode(token).data;
}