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
      .then(board => (new List({_id: query.createdList.id ,...query.createdList, idBoard: board._id })).save()) 
      ),
      
      /**
      * @desc update name in a list
      * @type {Promise}
      * @param {Object} query, {id}
      * @throws NOT_FOUND
      * @returns [action]
      */
      updateListName: (query, user) => (
        List.findOne({
          _id: query.idList,
        })
        .then(list => list ? list : Promise.reject(NOT_FOUND))
        .then(list => { 
          list.name = query.newValue ;
          list.save();
        })),

       /**
      * @desc update list closed 
      * @type {Promise}
      * @param {Object} query, {id}
      * @throws NOT_FOUND
      * @returns [action]
      */
     updateListClosed: (query, user) => (
      List.findOne({
        _id: query.idList,
      })
      .then(list => list ? list : Promise.reject(NOT_FOUND))
      .then(list => { 
        list.isClosed = query.newValue ;
        list.save();
      })),
        
        
      }