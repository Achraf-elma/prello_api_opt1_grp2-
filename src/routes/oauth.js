// Modules
const router = require("express").Router();
const jwt = require("jwt-simple");
const {tokenize, untokenize} = require("../middleware/authentification");

// Const (To move on env)
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const API_SCECRET = process.env.API_SCECRET;

// Models
const User = require("../models/User");

// Errors
const WRONG_PASSWORD = "WRONG PASSWORD";
const NOT_FOUND = "NOT FOUND";
const INCOMPLETE_FORM = "Sent data weren't enough to fullfil the request";
const USER_EXISTS = "USER EXISTS";

/**
 * 
 */
router.get("/", untokenize, (req, res) => (
  req.user ? res.json(req.user) : res.sendStatus(401)
));

/**
 * 
 */
router.post("/", (req, res) => {
  const password = req.body.password;
  const id = req.body.id;
  return (
    User.findOne({ $or: [
      { "fullName":id },
      { "email":id }
    ]})
    .then( user => user && user.checkPassword(password) ? user : Promise.reject(WRONG_PASSWORD))
    .then( user => res.status(201).json(tokenize(user)))
    .catch( error => error === WRONG_PASSWORD ? res.sendStatus(401) : Promise.reject(error))
    .catch( error => console.error(error) || res.sendStatus(500))
  );
});

/**
 * Dont know wat to do there
 */
router.delete("/", (req, res) => (
  res.sendStatus(204)
));

/**
 * Sign up
 */
router.put("/", (req, res) => (
  User.findOne({email: req.body.email})
  .then( user => user ? Promise.reject(USER_EXISTS) : {
    fullName: req.body.fullName || Promise.reject(INCOMPLETE_FORM),
    email: req.body.email || Promise.reject(INCOMPLETE_FORM),
  })
  .then( userData => new User(userData))
  .then( user => user.setPassword(req.body.password || Promise.reject(INCOMPLETE_FORM)))
  .then( user => user.save())
  .then( user => res.status(200).json(tokenize(user)))
  .catch( error => error === USER_EXISTS ? res.sendStatus(401) : Promise.reject(error))
  .catch( error => error === INCOMPLETE_FORM ? res.status(403).json({error}) : Promise.reject(error))
  .catch( error => console.error(error) || res.sendStatus(500))
))

/**
 * 
 */
router.post("/google", (req, res) => (
  Promise.resolve( jwt.decode(
    req.headers["authorization"].replace(/Bearer /, ""),
    GOOGLE_SECRET,
    true,
    "HS256"
  ))
  .then( token => (
    User.findOne({email: token.email})
    .then( user => user || User.create({
      fullName: token.name,
      email: token.email,
      memberType: "member",
    }))
  ))
  .then( user => res.status(200).json(tokenize(user)))
  .catch( error => console.error(error) || res.sendStatus("403"))
));

module.exports = router;