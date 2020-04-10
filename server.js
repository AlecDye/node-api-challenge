const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const projectsRouter = require("./projectsRouter");
const actionsRouter = require("./actionsRouter");

const server = express();

server.use(helmet());
server.use(morgan("short"));
server.use(express.json());

server.use("/api/projects", projectsRouter, actionsRouter);

server.use(function (req, res) {
  res.status(404).send("Page not found!");
});

module.exports = server;
