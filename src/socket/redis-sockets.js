// Modules
const socketServer = require('socket.io');
const redis = require("socket.io-redis");

// Mine
const {dispatcher} = require('./dispatcher');
const {decodeToken} = require('../middleware/authentification');

const socketEvents = {
  authentication: "authentication",
  connection: "connection",
  board: "board",
  disconnect: "disconnect",
  dispatch  : "dispatch",
}

// Functions
module.exports = (httpServer) => {
  const io = socketServer(httpServer);
  
  io.adapter(redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }));
  
  io.on(socketEvents.connection, (socket) => {

    // add to socket pools
    console.log("New socket:", socket.id);
    socket.on(socketEvents.disconnect, () => {
      // Remove from socket pool
      console.log('Socket out:', socket.id)
    });
    
    // Authenticate
    socket.on(socketEvents.authentication, (token) => {
      Promise.resolve(token)
      .then(token => socket.credentials = decodeToken(token))
        .then(creds => console.log("user:", creds && creds.idUser))
        .catch(error => console.error(error));
    })

    // Join board
    socket.on(socketEvents.board, (idBoard) => {

      console.log("Join room: ", idBoard);
      socket.join(idBoard);

      socket.on(socketEvents.dispatch, (action) => {
        console.log("Dispatch", action.type, "in room", idBoard);
        dispatcher(action, socket.credentials)
        .then(a => console.log(a) || a )
        .then( ok => socket.to(idBoard).broadcast.emit(socketEvents.dispatch, action))
        .catch(error => console.error(error));
      });
    });
    
  });
}