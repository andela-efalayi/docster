import jwt from 'jsonwebtoken';

/**
 * Returns true if user roleId is 1
 * @returns {bool} isAdmin
 */
export function isAdmin() {
  const user = jwt.decode(localStorage.getItem('docsterToken')).data;  
  return user.roleId === 1;
}

/**
 * @param {number} userId
 * @param {number} documentUserId
 * @returns {bool} isOwner
 */
export function isOwner(userId, documentUserId) {
  return userId === documentUserId;
}
