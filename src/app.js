/**
 * Load dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongodb');
const {untokenize} = require('./middleware/authentification');
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
app.use(
  '/api',
  bodyParser.urlencoded({extended:false}),
  bodyParser.json(),
  untokenize,
  routes
);

//TODO:
/**
 * API docs 
 * set up socket
 */

module.exports = app;