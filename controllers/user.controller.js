const { ValidationError } = require("yup");
const { registerValidator } = require("../validators/user.validators");
const formErrorsResponse = require("../responses/formerrors.response");
const { UserModel } = require("../database/init");
const createResponse = require("../responses/response");
const bcrypt = require("bcrypt");

const register = async (request, response) => {
  try {
    const userData = await registerValidator.validate(request.body, {
      abortEarly: false,
    });
    userData.password = await bcrypt.hash(userData.password, 12);
    const user = await UserModel.create(userData);
    const userObj = user.toJSON();
    delete userObj.password;
    response.status(201).json(createResponse("user", "create", userObj));
  } catch (e) {
    if (e instanceof ValidationError) {
      response.status(400).json(formErrorsResponse(e));
      return;
    }
    throw e;
  }
};

module.exports = { register };
