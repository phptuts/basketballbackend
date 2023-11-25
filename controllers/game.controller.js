const { ValidationError } = require("yup");
const formErrorsResponse = require("../responses/formerrors.response");
const {
  createResponse,
  createPaginateResponse,
} = require("../responses/response");
const {
  addGameValidator,
  updateScoreValidator,
} = require("../validators/game.validators");
const { GameModel } = require("../database/init");

const getGames = async (request, response) => {
  const pageSize = 3;
  let page = 1;
  if (request.query["page"]) {
    page = +request.query["page"];
  }
  if (page <= 0) {
    page = 1;
  }
  let where = {};
  if (request.query["user_id"]) {
    where["userId"] = +request.query["user_id"];
  }

  if (request.query["type"]) {
    switch (request.query["type"]) {
      case "live":
        where["isLive"] = true;
        where["isOver"] = false;
        break;
      case "over":
        where["isLive"] = false;
        where["isOver"] = true;
        break;
      case "not_started":
        where["isLive"] = false;
        where["isOver"] = false;
        break;
      default:
        break;
    }
  }

  const { count, rows } = await GameModel.findAndCountAll({
    where,
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });

  response.json(createPaginateResponse("game", page, pageSize, count, rows));
};

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

const updateGame = async (request, response) => {
  await update(
    request,
    response,
    "update_game",
    request.body,
    addGameValidator
  );
};

const updateScore = async (request, response) => {
  await update(
    request,
    response,
    "update_score",
    request.body,
    updateScoreValidator
  );
};

const updateStart = async (request, response) => {
  await update(request, response, "start_game", {
    isOver: false,
    isLive: true,
  });
};

const updateEnd = async (request, response) => {
  await update(request, response, "end_game", {
    isOver: true,
    isLive: false,
  });
};

const update = async (
  request,
  response,
  actionType,
  data,
  validator = null
) => {
  try {
    const game = await GameModel.findByPk(request.params.id);

    if (!game) {
      response.status(404).send("");
      return;
    }

    if (+game.userId !== +request.user.id) {
      response.status(403).send("");
      return;
    }
    let validData;

    if (validator != null) {
      validData = await validator.validate(data, {
        abortEarly: false,
      });
    } else {
      validData = data;
    }

    await game.update(validData);
    response.json(createResponse("game", actionType, game.toJSON()));
  } catch (e) {
    if (e instanceof ValidationError) {
      response.status(400).json(formErrorsResponse(e));
      return;
    }
    throw e;
  }
};

module.exports = {
  addGame,
  getGame,
  updateScore,
  updateGame,
  updateEnd,
  updateStart,
  getGames,
};
