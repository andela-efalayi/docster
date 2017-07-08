import toastr from 'toastr';

/**
 * @param {string} message 
 * @param {string} type 
 * @returns {object} toastr
 */
export default function showToast(message, type){
  toastr.options.timeOut = 5000;  
  switch (type) {
    case 'warning':
      return toastr.warning(message);
    case 'success':
      return toastr.success(message);
    case 'error':
      return toastr.error(message);
    case 'remove':
      return toastr.remove();
    case 'clear':
      return toastr.clear();
    default:
      return toastr.info(message);
  }
}
