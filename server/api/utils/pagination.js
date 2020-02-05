module.exports = {
  getPagingArgs: args => {
    let {
      skip = 0,
      limit = 10,
      sort = 'createdAt:desc',
      ...query
    } = args;

    let [field, orderBy] = sort.split(":");
    sort = { [field]: orderBy };

    return {
        skip: +skip,
        limit: +limit,
        sort,
        query,
    }
  },

  getPagingResult: (args, data) => {
    const skip = args.skip || 0;
    const limit = args.limit || 10;
    const total = data.total;
    const endIndex = +skip + +limit - 1;

    return {
      total,
      startIndex: +skip,
      endIndex: endIndex > total - 1 ? total - 1 : endIndex,
      hasNextPage: skip + limit < total ? true : false,
    }
  },

}