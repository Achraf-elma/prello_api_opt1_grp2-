const Label = require('../models/Label');
const Board = require('../models/Board');
const Card = require('../models/Card');


const IS_PRIVATE = "User cannot see target board";
const NOT_FOUND = "No board match given id";

module.exports = {
  IS_PRIVATE,
  NOT_FOUND,

  /**
   * @desc get labels of a board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns [action]
   */
  findByBoard: (query, user) => (
    Board.findOne({
      _id: query.idBoard,
    })
    .then(board => board ? board : Promise.reject(NOT_FOUND))
    .then(board => Label.find({ idBoard: board._id }) )
    



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
      .then(card => (new Label({...query.createdLabel, idCard: card._id })).save())
     
  ),
}