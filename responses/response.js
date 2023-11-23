function createResponse(type, action, data) {
  return {
    meta: {
      type,
      action,
    },
    data,
  };
}

function createPaginateResponse(type, page, pageSize, rowCount, items) {
  const numberOfPages = Math.ceil(rowCount / pageSize);

  return {
    meta: {
      type,
      action: "get_list",
      page,
      page_size: pageSize,
      number_of_pages: numberOfPages,
      is_first_page: page <= 1,
      is_last_page: page >= numberOfPages,
    },
    data: items,
  };
}

module.exports = { createResponse, createPaginateResponse };
