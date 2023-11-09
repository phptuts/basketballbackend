const { ValidationError } = require("yup");
const { loginValidator } = require("../validators/user.validators");
const formErrorsResponse = require("../responses/formerrors.response");

const login = async (request, response) => {
  try {
    const logindata = await loginValidator.validate(request.body, {
      abortEarly: false,
    });
    response.status(401).json(logindata);
  } catch (e) {
    if (e instanceof ValidationError) {
      response.status(400).json(formErrorsResponse(e));
      return;
    }
    throw e;
  }
};

module.exports = { login };
