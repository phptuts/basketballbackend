const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { UserModel } = require("../database/init");

/**
 *
 * @param {import("express").Request} request
 * @param {*} response
 * @param {*} next
 */
const authenticationMiddleware = async (request, response, next) => {
  let authToken = request.headers.authorization;
  if (!authToken) {
    next();
    return;
  }
  try {
    authToken = authToken.replace("Bearer ", "");
    const privateKeyPath = path.join(__dirname, "..", "private.key");
    const privateKey = fs.readFileSync(privateKeyPath);
    const { userId } = jwt.verify(authToken, privateKey, {
      algorithm: "RS256",
    });
    const user = await UserModel.findByPk(userId);
    request.user = user;
  } catch (e) {
    console.log(e);
  }

  next();
};

module.exports = authenticationMiddleware;
