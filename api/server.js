const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/auth-middlewear");
const authRouter = require("../auth/auth-router");
const recipesRouter = require("../api/recipes/recipe-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/recipes", authenticate, recipesRouter);

module.exports = server;
