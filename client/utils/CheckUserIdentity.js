const user = JSON.parse(localStorage.getItem('currentUser'));

/**
 * Returns true if user roleId is 1
 * @returns {bool} isAdmin
 */
export function isAdmin() {
  return user.roleId === 1;
}

/**
 * @returns {bool} isOwner
 */
export function isOwner() {
  return user.roleId;
}