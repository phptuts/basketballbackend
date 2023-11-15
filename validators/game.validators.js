const yup = require("yup");

const addGameValidator = yup.object({
  hometeam: yup.string().required().min(5).max(20),
  awayteam: yup.string().required().min(5).max(20),
  gametime: yup.string().required().min(5).max(50),
});

const updateScoreValidator = yup.object({
  awayteamScore: yup.number().required().min(0).max(200),
  hometeamScore: yup.number().required().min(0).max(200),
  quarter: yup.number().required().min(1).max(4),
  minutes: yup.number().required().min(0).max(15),
  seconds: yup.number().required().min(0).max(60),
});

module.exports = { addGameValidator, updateScoreValidator };
