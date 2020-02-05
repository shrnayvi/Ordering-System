/**
 * Get the parameters needed for pagination
 * @param {Object} paginationParm Object required for pagination
 * @param {string|number} paginationParam.page Page number
 * @param {string|number} paginationParam.size Number of data per page
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

/*
module.exports = {
  getPagingArgs = args => {
    const skip = args.skip || 0;
    const limit = args.limit || 10;
    const query = args.q || {};

    let [field, orderBy] = (args.sort || createdAt:desc).split(":");
    const sort = { [field: orderBy] };

    return {
        skip,
        limit,
        sort,
        query,
    }
  },

  getPagingResult = (args, data) => {
    const skip = args.skip || 0;
    const limit = args.limit || 10;
    const total = data.total;
    const endIndex = skip + limit - 1;

    return {
      total,
      startIndex: skip,
      endIndex: endIndex > total - 1 ? total - 1 : endIndex;
      hasNextPage: skip + limit < total ? true : false,
    }
  },

}
*/