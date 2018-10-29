const express = require("express");
const User = require('../models/User.js');
const mongoose = require('../db/mongodb');

//const router = express.Router();
//User.create('Toto', 'toto@gmail.com', 'this is my bio', 'TT', 'member', 'admin', [], []);

/*var req =  {fullName: 'XXX',
    email: 'toto@gmail.com',
    bio: 'this is my bio',
    initials: 'TT',
    memberType: 'member',
    loginType: 'admin',
    idBoards: [],
    notifications: []};
User.create(req, function(err, post){
    if (err) return next(err);
    User.find(function (err, users){
        if (err) return console.error(err);
        console.log(users);
    });
});*/
/*User.find(function (err, users){
    if (err) return console.error(err);
    console.log(users);
});*/