const { addGame, getGame } = require("../controllers/game.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.get("/:id", getGame);
router.post("/", authorizationMiddleware, addGame);

module.exports = router;
