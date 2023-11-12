const yup = require("yup");

const addGameValidator = yup.object({
  hometeam: yup.string().required().min(5).max(20),
  awayteam: yup.string().required().min(5).max(20),
  gametime: yup.string().required().min(5).max(50),
});

module.exports = { addGameValidator };
