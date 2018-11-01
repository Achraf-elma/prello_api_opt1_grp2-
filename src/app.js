/**
 * Load dependencies
 */
const express = require('express');
const mongoose = require('./db/mongodb');
const routes = require("./routes");
/**
 * Create Express server
 */
const app = express();


/**
 * Configure Express server
 */
app.set('port', process.env.DOKKU_DOCKERFILE_PORTS||8080);

/**
 * API requests 
 */
app.use("/api", routes);

//TODO:
/**
 * API docs 
 * set up socket
 */

module.exports = app;