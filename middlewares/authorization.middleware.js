const authorizationMiddleware = (request, response, next) => {
  if (request.user) {
    next();
    return;
  }

  response.status(403).send("");
};

module.exports = authorizationMiddleware;
