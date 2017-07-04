
/**
 * @param {any} mainString 
 * @param {any} limit 
 * @param {any} endChar 
 * @returns {string} truncatedString || mainString
 */
export default function setMaxCharacters(mainString, limit, endChar) {
  let truncatedString
  if (mainString.length > limit) {
    truncatedString = `${mainString.substring(0, limit) + endChar}`;
    return truncatedString;
  } 
  return mainString;
}