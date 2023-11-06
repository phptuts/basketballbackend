const { ValidationError } = require("yup");
const { registerValidator } = require("../validators/user.validators");
const formErrorsResponse = require("../responses/formerrors.response");
const { UserModel } = require("../database/init");
const createResponse = require("../responses/response");

const register = async (request, response) => {
  try {
    await registerValidator.validate(request.body, { abortEarly: false });
    const user = await UserModel.create(request.body);
    response.status(201).json(createResponse("user", "create", user));
  } catch (e) {
    if (e instanceof ValidationError) {
      response.status(400).json(formErrorsResponse(e));
      return;
    }
    throw e;
  }
};

module.exports = { register };
