const controllerWrapperAsync = (controllerFunc) => {
  return async (request, response, next) => {
    try {
      await controllerFunc(request, response);
    } catch (error) {
      next(error);
    }
  };
};

const middlewareWrapperAsync = (middleware) => {
  return async (request, response, next) => {
    try {
      await middleware(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  controllerWrapperAsync,
  middlewareWrapperAsync,
};
