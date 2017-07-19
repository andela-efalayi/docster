/**
 * @param {any} roleId 
 * @returns {bool} grantAccess
 */
export function grantAccess(roleId) {
  return roleId === 1
}

/**
 * @param {any} userId 
 * @param {any} documentUserId 
 * @returns {bool} isOwner
 */
export function isOwner(userId, documentUserId) {
  return userId === documentUserId;
}

/**
 * @param {any} userRoleId 
 * @param {any} documentRoleId 
 * @returns {bool} isValidRole
 */
export function isValidRole(userRoleId, documentRoleId){
  return userRoleId === documentRoleId
}