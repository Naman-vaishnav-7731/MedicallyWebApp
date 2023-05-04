//get pagination | page no and | size of one page

const getPagination = (page, size) => {
  // limit qual size of one page
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalusers, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalusers / limit);

  return { totalusers, users, totalPages, currentPage };
};

module.exports = {getPagination , getPagingData}