const Action = require('../models/Action');
const Board = require('../models/Board');
const Card = require('../models/Card');
const CheckList = require('../models/CheckList');
const CheckListItem = require('../models/CheckListItem');
const List = require('../models/List');
const Notification = require('../models/Notification');
const Team = require('../models/Team');
const User = require('../models/User');
const Label = require('../models/Label');
const mongoose = require('mongodb');

Action.collection.drop();
Board.collection.drop();
Card.collection.drop();
CheckList.collection.drop();
CheckListItem.collection.drop();
List.collection.drop();
//Notification.collection.drop();
Team.collection.drop();
User.collection.drop();
Label.collection.drop();
//User.collection.drop();

User.create(
            [
                {
                    _id: "toto",
                    fullName: "Toto",
                    email: "toto@gmail.com",
                    bio: "Animal lover",
                    initials: "T.O",
                    memberType: "admin",
                    loginType: "OAuth",
                    hashpass: "dqefrqsgsdh",
                    saltpass: "cvqsrgeqthq" 
                },
                {
                    _id: "titi",
                    fullName: "Titi",
                    email: "titi@gmail.com",
                    bio: "Food lover",
                    initials: "T.I",
                    memberType: "User",
                    loginType: "Prello",
                    hashpass: "egefadaz",
                    saltpass: "zrgfzdc"
                },
                {
                    _id: "tata",
                    fullName: "Tata",
                    email: "tata@gmail.com",
                    bio: "Sleep lover",
                    initials: "T.O",
                    memberType: "User",
                    loginType: "OAuth",
                    hashpass: "dzqfa2435",
                    saltpass: "egqz24254"
                }]).then(users => {
            console.log(`${users.length} users created`);
          })