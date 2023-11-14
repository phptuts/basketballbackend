const { ValidationError } = require("yup");
const formErrorsResponse = require("../responses/formerrors.response");
const createResponse = require("../responses/response");
const { addGameValidator } = require("../validators/game.validators");
const { GameModel } = require("../database/init");

const getGame = async (reqeust, response) => {
  const game = await GameModel.findByPk(reqeust.params.id);

  if (!game) {
    response.status(404).send("");
    return;
  }

  response.json(createResponse("game", "get", game.toJSON()));
};

const addGame = async (request, response) => {
  try {
    const validData = await addGameValidator.validate(request.body, {
      abortEarly: false,
    });
    const newGameObj = {
      ...validData,
      isOver: false,
      isLive: false,
      userId: request.user.id,
    };
    const game = await GameModel.create(newGameObj);
    response.json(createResponse("game", "create", game.toJSON()));
  } catch (e) {
    if (e instanceof ValidationError) {
      response.status(400).json(formErrorsResponse(e));
      return;
    }
    throw e;
  }
};

module.exports = { addGame, getGame };
