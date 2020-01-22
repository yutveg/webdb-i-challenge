const express = require("express");

const db = require("./data/dbConfig.js");
const accountsRouter = require("./accounts/router.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountsRouter);
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "something broke" });
});

module.exports = server;
