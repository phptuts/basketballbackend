const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const loginRoutes = require("./routes/login.route");
const gameRoutes = require("./routes/game.route");
const { sequelize } = require("./database/init");
var cors = require("cors");
const authenticationMiddleware = require("./middlewares/authentication.middleware");
const authorizationMiddleware = require("./middlewares/authorization.middleware");

app.use(cors());
app.use(express.json());
app.use(authenticationMiddleware);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/game", authorizationMiddleware, gameRoutes);
app.get("/", (req, res) => {
  res.send("basketball backend");
});

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("server is running");
  } catch (e) {
    console.log(e, "db error");
  }
});
