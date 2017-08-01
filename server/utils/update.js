
/**
 * Set new title slug if document title is updated
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 * @returns {void}
 */
export default function setDocumentSlug(req, res, next) {
  if(req.body.title) {
    req.body.slug = req.body.title;
  }
  next();
}
