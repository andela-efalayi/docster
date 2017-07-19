/**
 * Returns true if user roleId is 1
 * @returns {bool} isAdmin
 */
export function isAdmin() {
  const user = JSON.parse(localStorage.getItem('currentUser'));  
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