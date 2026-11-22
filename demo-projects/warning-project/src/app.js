const express = require("express");
const _ = require("lodash");

const app = express();
const items = [{ id: 1, val: "alpha" }, { id: 2, val: "beta" }];

app.get("/items", (req, res) => {
  res.json(_.map(items, "val"));
});

module.exports = app;
