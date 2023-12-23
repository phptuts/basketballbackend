const { login } = require("../controllers/login.controller");
const { controllerWrapperAsync } = require("../helpers/asyncwrapper");

const router = require("express").Router();

router.post("/", controllerWrapperAsync(login));

module.exports = router;
