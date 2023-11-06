const dotenv = require("dotenv");
dotenv.config();
const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");

app.use(express.json());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("basketball backend");
});

app.listen(3000, async () => {
  try {
    const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
    await sequelize.authenticate();
    console.log("server is running");
  } catch (e) {
    console.log(e, "db error");
  }
});
