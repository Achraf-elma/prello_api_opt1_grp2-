const mongoose = require('mongoose');
//var mongoClient = require('mongodb').MongoClient;


//TODO: change the URL to env variables
mongoose.connect(process.env.MONGO_URL/*'mongodb://localhost:27017'*/, { /*promiseLibrary: require('bluebird'),*/ useNewUrlParser: true})
  .then(() => console.log('Connection to database succesful'))
  .catch((err) => {
      console.error(err);
      console.log(process.env.MONGO_URL);
    });

/*mongoClient.connect('mongodb://localhost:27017', function(err, client){
    console.log("Connected succedfully");
})*/

module.exports = mongoose;