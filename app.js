const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("basketball backend");
});

app.listen(3000, () => {
  console.log("server is running");
});
