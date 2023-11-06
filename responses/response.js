function createResponse(type, action, data) {
  return {
    meta: {
      type,
      action,
    },
    data,
  };
}

module.exports = createResponse;
