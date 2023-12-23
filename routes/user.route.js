const { register } = require("../controllers/user.controller");
const { controllerWrapperAsync } = require("../helpers/asyncwrapper");

const router = require("express").Router();

router.post("/", controllerWrapperAsync(register));

module.exports = router;
