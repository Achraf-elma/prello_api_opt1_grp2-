const Board = require('../models/Board');

const IS_PRIVATE = "user cannot see target board";
const NOT_FOUND = "No board match given id";

module.exports = {
  IS_PRIVATE,
  NOT_FOUND,

  /**
   * @desc get one board
   * @type {Promise}
   * @param {Object} queryIds, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns board
   */
  findOne: (queryIds, user) => (
    Board.findOne({
      _id: queryIds.idBoard,
    })
    // .then( a => console.log(a))
    .then( board => board ? board : Promise.reject(NOT_FOUND))
    .then( board => board.isUserAllowed( user && user.idUser ) ? board : Promise.reject( IS_PRIVATE ))
  )
}

//TOD:
/**
 * find board by date of last update
 */

 /**
  * find lists of a board
  */

  /**
   * find by users
   */

   /**
    * find public board 
    */

    