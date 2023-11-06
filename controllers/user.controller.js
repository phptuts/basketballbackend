const { ValidationError } = require("yup");
const { registerValidator } = require("../validators/user.validators");
const formErrorsResponse = require("../responses/formerrors.response");

const register = async (request, response) => {
  try {
    await registerValidator.validate(request.body, { abortEarly: false });
    console.log(request.body, "user");
    response.json(request.body);
  } catch (e) {
    if (e instanceof ValidationError) {
      response.status(400).json(formErrorsResponse(e));
      return;
    }
    throw e;
  }
};

module.exports = { register };
