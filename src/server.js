const express = require('express');

const User = require('./models/User.js');
const mongoose = require('./db/mongodb');
var app = express();

var req =  {fullName: 'XXX',
email: 'toto@gmail.com',
bio: 'this is my bio',
initials: 'TT',
memberType: 'member',
loginType: 'admin',
idBoards: [],
notifications: []};
//app.use("/api", require("./routes"));

app.get('/', function(request, res){
    /*User.create(req, function(err, post){
        if (err) return next(err);
    });
    User.find(function (err, users){
        if (err) return console.error(err);
        console.log(users);
        res.end(users)});*/
        res.end("Hello World");
});
   // res.end('Hello World')

app.listen(process.env.DOKKU_DOCKERFILE_PORTS||8080)