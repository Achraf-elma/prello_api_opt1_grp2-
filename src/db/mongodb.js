const mongoose = require('mongoose');


/**
 * Establish connection to MongoDB
 */
mongoose.connect(/*process.env.MONGO_URL_PRELLO_2018*/'mongodb://localhost:27017', { /*promiseLibrary: require('bluebird'),*/ useNewUrlParser: true})
  .then(() => console.log('Successfully connected to MongoDB database.'))
  .catch((err) => {
      console.error(err);
      console.log('Something is wrong with the connection to MongoDB. Please make sure your Mongo container is running.')
    });

module.exports = mongoose;