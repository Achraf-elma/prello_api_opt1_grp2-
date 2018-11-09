const Action = require('../models/Action');
const Board = require('../models/Board');

const IS_PRIVATE = "User cannot see target board";
const NOT_FOUND = "No board match given id";

module.exports = {
  IS_PRIVATE,
  NOT_FOUND,

  /**
   * @desc get action of a board
   * @type {Promise}
   * @param {Object} query, {idBoard, perpage, page}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns [action]
   */
  findByBoard: (query, user) => (
    Board.findOne({
      _id: query.idBoard,
    })
    // .then( a => console.log(a))
    .then(board => board ? board : Promise.reject(NOT_FOUND))
    .then(board => board.isUserAllowed(user && user.idUser) ? board : Promise.reject(IS_PRIVATE))
    .then(board => Action.find({idBoard: board._id}, null, {
      skip: query.page * query.perpage,
      limit: query.perpage,
      // sort: {timestamp}
    }))
  ),

}