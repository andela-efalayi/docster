
/**
 * @param {any} dateString 
 * @returns {string} date
 */
export default function getDate(dateString) {
  const dateSplit = dateString.split(/[-:T]/g);
  return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
}