const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");

app.use(express.json());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("basketball backend");
});

app.listen(3000, () => {
  console.log("server is running");
});
