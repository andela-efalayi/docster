
/**
 * Check if param is a string
 * @param {any} param 
 * @returns {bool} isString
 */
export function isString(param) {
  return isNaN(param);
}

/**
 * Check if param is less than zero
 * @param {any} param 
 * @returns {bool} isLessThanZero
 */
export function isLessThanZero(param) {
  return param < 0;
}

/**
 * Check if param is a decima
 * @param {any} param 
 * @returns {bool} isDecimal
 */
export function isDecimal(param) {
  const regEx = /[0-9]+.[0-9]+$/;
  return regEx.test(param);
}

