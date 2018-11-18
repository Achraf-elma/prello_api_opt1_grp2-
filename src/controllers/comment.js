const Label = require('../models/Label');
const Board = require('../models/Board');
const Card = require('../models/Card');
const Comment = require('../models/Comment'); 
const User = require('./user');


const IS_PRIVATE = "User cannot see target board";
const NOT_FOUND = "No board match given id";

module.exports = {
  IS_PRIVATE,
  NOT_FOUND,

  /**
   * @desc get comments of a board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUer}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns [action]
   */
  findByCard: (query, user) => (
    Card.findOne({
      _id: query.idCard,
    })
    .then(card => card ? card : Promise.reject(NOT_FOUND))
    .then(card => Comment.find({ idCard: query.idCard}))
    .then(comments => comments)
  
    
    
  
    
   // .then(comment =>{...comment, } )
    
      
   ),

   
      /**
   * @desc add label to card 
   * @type {Promise}
   * @param {Object} query, {idCard}
   * @throws NOT_FOUND
   * @returns [action]
   */
  createInCard: (query, user) => (
    Card.findOne({
      _id: query.idCard,
    })
      .then(card => card ? card : Promise.reject(NOT_FOUND))
      .then(card => (new Comment({_id : query.createdComment.id , ...query.createdComment, idCard: query.idCard})).save())
      .catch(comment => console.log(comment))
     
  ),


}