const mongoose = require('mongoose');
//const seeder = require('mongoose-seeder');
const data = require('../fakeData/data.json');
const seeder = require('./seeder.js');
/*seeder.connect('mongodb://localhost:27017/prello', function(){
  seeder.loadModels([
    '../models/Action.js',
    '../models/Board.js',
    '../models/Card.js',
    '../models/CheckList.js',
    '../models/CheckListItem.js',
    '../models/MailSettings.js',
    '../models/Notification.js',
    '../models/Organization.js',
    '../models/User.js',
    '../models/Label.js'
  ]);
  seeder.clearModels(['User', 'Organization', 'Notification', 'MailSettings', 'CheckListItem', 'CheckList', 'Card', 'Board', 'Action', 'Label'], function(){
    seeder.populateModels(data)
    .then(seeder.disconnect())
    .catch(err => console.log(err));
  });

});*/



/**
 * Establish connection to MongoDB
 */
mongoose.connect('mongodb://prello-db:ab3aa24f81d8f647dd558fda730df0fc@dokku-mongo-prello-db:27017/prello-db', { /*promiseLibrary: require('bluebird'),*/ useNewUrlParser: true})
  .then(() => {
    console.log('Successfully connected to MongoDB database.')
    seeder.seed();
  })
  .catch((err) => {
      console.error(err);
      console.log('Something is wrong with the connection to MongoDB.')
    });
/*const db = mongoose.connection;
db.on("error", (err) => console.log(err));

db.on("connected", ()=> {
  console.log("Connected to database");
  const Action = require('../models/Action');
  const Board = require('../models/Board');
  const Card = require('../models/Card');
  const CheckList = require('../models/CheckList');
  const CheckListItem = require('../models/CheckListItem');
  const List = require('../models/List');
  const Notification = require('../models/Notification');
  const Organization = require('../models/Organization');
  const User = require('../models/User');
  const Label = require('../models/Label');
  seeder.seed(data, { dropDatabase: false, dropCollections: true }).then(function(dbData){
      console.log("Database seeded!");
  }).catch(function(err){
    console.error("Error seeding database", err);
  });
})*/









module.exports = mongoose;