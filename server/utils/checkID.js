
/**
 * Check if ID parameter is a string or negative number
 * @param {object} req 
 * @param {object} res
 * @param {func} next
 * @returns {bool} isString
 */
export default function checkID(req, res, next) {
  const paramId = parseInt(req.params.id);
  if(isNaN(paramId) === true) {
    return res.status(400).send({
      message: 'Id must be numeric'
    });
  }
  if(paramId < 0) {
    return res.status(400).send({
      message: 'Id must be greater than zero'
    });
  }
  req.params.id = Math.floor(paramId);
  next();
}
