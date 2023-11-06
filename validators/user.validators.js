const yup = require("yup");

const registerValidator = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(30),
});

module.exports = { registerValidator };
