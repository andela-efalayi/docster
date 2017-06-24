import axios from 'axios';

/** Set authorisation token in request header
 * @param {string} token 
 * @return {void}
 */
export default function setAuthorisationToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorisation'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorisation'];
  }
}