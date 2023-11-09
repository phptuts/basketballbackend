const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const loginRoutes = require("./routes/login.route");
const { sequelize } = require("./database/init");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
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
