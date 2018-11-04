const jwt = require("jwt-simple");

// Env
const API_SCECRET = process.env.API_SCECRET;
const TOKEN_PERIME = process.env.TOKEN_PERIME * 1; //*1 convert string to number (or NaN)

// Errors
const NO_AUTH_HEADER = "No Autorization header";
const EXPIRED = "Token reach expiration date";

/**
 * @desc set user credentials in request.user
 */
module.exports = {
  "tokenize": (user) => {
    let lightUser = {
      fullname: user.fullname,
      email: user.email,
      memberType: user.memberType,
      expires: Date.now() + TOKEN_PERIME,
    };
    return ({
        accessToken: jwt.encode(lightUser, API_SCECRET, "HS256"),
      ...lightUser,
    });
  },
  "untokenize": (request, response, next) => (
    Promise.resolve( 
      request.headers.authorization ?
      request.headers.authorization.replace(/Bearer /, ""):
        Promise.reject(NO_AUTH_HEADER)
    )
    .then( cryptedToken => jwt.decode(cryptedToken, API_SCECRET, false, "HS256"))
    .then(token => token.expires > Date.now() ? token : Promise.reject(EXPIRED))
    // .then( uncryptedToken => /* User checking logic */ uncryptedToken )
    .then( user => request.user = user )
    // No reason to crash if the user doesn't try to authenticate himself
    .catch(error => error === NO_AUTH_HEADER || Promise.reject(error))
    .catch( error => error === EXPIRED || Promise.reject(error))
    .catch( error => console.error(error))
    // This task isn't mandatory
    .then( done => next())
  )
};