/**
 * Load dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
app.set('port', process.env.DOKKU_DOCKERFILE_PORTS||3000);

app.use(cors({
  allowedHeaders: ["Content-Type","Authorization"]
}))

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

app.use(( req, res ) => res.status(404).json({error: "This route leads nowhere"}));


//TODO:
/**
 * API docs 
 * set up socket
 */

module.exports = app;