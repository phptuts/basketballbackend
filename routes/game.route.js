const { addGame } = require("../controllers/game.controller");

const router = require("express").Router();

router.post("/", addGame);

module.exports = router;
