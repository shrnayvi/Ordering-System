/**
 * Get the parameters needed for pagination
 * @param {String|Number} page Page number
 * @param {String|Number} size Number of data per page
 * @returns {Object} Returns object with skip and limit
 */
module.exports = ({ page = 1, size = dataPerPage }) => {
   page = parseInt(page),
   size = parseInt(size);

   let skip = 0;
      limit = !isNaN(size) ? size : dataPerPage;

   if(!isNaN(page)) {
      skip = (page - 1) * limit;
   }
   return {
      skip,
      limit
   }
}