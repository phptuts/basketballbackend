const register = (request, response) => {
  console.log(request.body, "user");
  response.json(request.body);
};

module.exports = { register };
