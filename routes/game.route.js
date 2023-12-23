const {
  addGame,
  getGame,
  updateScore,
  updateGame,
  updateStart,
  updateEnd,
  getGames,
} = require("../controllers/game.controller");
const { controllerWrapperAsync } = require("../helpers/asyncwrapper");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.get("/:id", controllerWrapperAsync(getGame));
router.get("/", controllerWrapperAsync(getGames));
router.post("/", authorizationMiddleware, controllerWrapperAsync(addGame));
router.put(
  "/:id/updatescore",
  authorizationMiddleware,
  controllerWrapperAsync(updateScore)
);
router.put("/:id", authorizationMiddleware, controllerWrapperAsync(updateGame));
router.put(
  "/:id/start",
  authorizationMiddleware,
  controllerWrapperAsync(updateStart)
);
router.put(
  "/:id/end",
  authorizationMiddleware,
  controllerWrapperAsync(updateEnd)
);

module.exports = router;
