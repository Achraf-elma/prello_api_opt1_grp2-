/**
 * Is used so that there is no need to specify in every files which controllers file is used in it
 */
require('./action');
require('./board');
require('./card');
/*require('./checkList');
require('./checkListItem');
require('./list');
require('./notification');
require('./organization');
require('./user');*/

const List = require('../models/List');
const Board = require('../models/Board');
// Errors
const IS_PRIVATE = "user cannot see target board";
const NOT_FOUND = "No board match given id";
const INCOMPLETE_BODY = "Informations sent were not enough";

module.exports = {
  IS_PRIVATE: "user cannot see target board",
  NOT_FOUND: "No board match given id",
  INCOMPLETE_BODY,
  /**
   * @desc get lists of a board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns [action]
   */
  findByBoard: (query, user) => (
    Board.findOne({
      _id: query.idBoard,
    })
    .exec()
      // .then( a => console.log(a))
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => board.isUserAllowed(user && user.idUser) ? board : Promise.reject(IS_PRIVATE))
      .then(board => List.find({ idBoard: board._id }))
  ),
  /**
   * @desc add lists in a board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns [action]
   */
  createInBoard: (query, user) => (
    Board.findOne({
      _id: query.idBoard,
    })
      // .then( a => console.log(a))
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => board.isUserAllowed(user && user.idUser) ? board : Promise.reject(IS_PRIVATE))
      .then(board => (new List({...query.createdList, idBoard: board._id })).save()) 
  ),
}