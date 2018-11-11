require("dotenv").config();
const http = require('http');
const app = require('./app');
const socket = require('./socket/redis-sockets');
/**
 * Start server
 */
const server = http.createServer(app);
const io = socket(server);
server.listen(app.get('port'), function () { 
    console.log('Express server listening on port: ' + app.get('port'));
});
