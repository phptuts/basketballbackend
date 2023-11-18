const {
  addGame,
  getGame,
  updateScore,
  updateGame,
  updateStart,
  updateEnd,
} = require("../controllers/game.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.get("/:id", getGame);
router.post("/", authorizationMiddleware, addGame);
router.put("/:id/updatescore", authorizationMiddleware, updateScore);
router.put("/:id", authorizationMiddleware, updateGame);
router.put("/:id/start", authorizationMiddleware, updateStart);
router.put("/:id/end", authorizationMiddleware, updateEnd);

module.exports = router;
