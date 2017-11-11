  /**
   * Set page meta-data
   * @param {number} count 
   * @param {number} limit 
   * @param {number} offset
   * @returns {object} pageMetaData
   */
export default function setPageMetaData(count, limit, offset) {
  const numberOfPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  const maxPageSize = limit;
  const totalCount = count;
  return {
    numberOfPages,
    currentPage,
    maxPageSize,
    totalCount
  }
}
