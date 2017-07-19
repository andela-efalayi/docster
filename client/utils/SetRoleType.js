
/**
 * @param {number} roleId 
 * @returns {string} date
 */
export default function getDate(roleId) {
  switch(roleId) {
    case 1:
      return "Administrator"
    case 2:
      return "Member"
    case 3:
      return "Owner"
    case 4:
      return "Viewer"
    default:
      return "Role does not exist"
        
  }
}