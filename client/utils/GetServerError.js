
/**
 * @param {object} error 
 * @returns {string} error string
 */
export default function getServerError(error){
  return JSON.parse(JSON.stringify(error)).response;
}