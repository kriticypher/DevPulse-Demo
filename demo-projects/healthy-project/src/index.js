const express = require("express");
const chalk = require("chalk");

const app = express();
const port = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(chalk.green("Server running on port " + port));
  });
}

module.exports = app;
