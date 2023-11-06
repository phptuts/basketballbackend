const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const { sequelize, UserModel } = require("./database/init");

app.use(express.json());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("basketball backend");
});

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    await UserModel.create({
      email: "noah@gmail.com",
      password: "bluemoon",
    });
    console.log("server is running");
  } catch (e) {
    console.log(e, "db error");
  }
});
