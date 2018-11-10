const Board = require('../models/Board');
const Organization = require('../models/Organization');
const Member = require('../models/User');

const IS_PRIVATE = "user cannot see target board";
const NOT_OWNER = "Only board owner is allowed to do that";
const NOT_FOUND = "No board match given id";
const INCOMPLETE_BODY = "Informations sent were not enough";

module.exports = {
  IS_PRIVATE,
  NOT_OWNER,
  NOT_FOUND,
  INCOMPLETE_BODY,
  /**
   * @desc get one board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns board
   */
  findOne: (query, user) => (
    Board.findOne({
      _id: query.idBoard,
    })
    // .then( a => console.log(a))
    .then( board => board ? board : Promise.reject(NOT_FOUND))
    .then( board => board.isUserAllowed( user && user.idUser ) ? board : Promise.reject( IS_PRIVATE ))
  ),
  /*findByUser: (user) => (
    Board.
  )*/
  /**
   * @desc upsert one board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @returns board
   */
  upsert:(query, user) => (
    Board.findById(query.idBoard)
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => board.idOwner === (user && user.idUser) ? board.save(query.updatedBoard) : Promise.reject(NOT_OWNER))
      .catch(error => error === NOT_FOUND ? (new Board(query.updatedBoard)).save() : Promise.reject(error))
  ),

  /**
   * @desc create a new board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns board
   */
  create:(query, user) => (
    (new Board(query.createdBoard)).save()
  ),

  /**
   * @desc close a board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @returns board
   */
  disable:(query, user) => (
    Board.findById(query.idBoard)
    .then(board => board ? board : Promise.reject(NOT_FOUND))
    .then(board => board.idOwner === (user && user.idUser) ? board.save({ isClosed: true }) : Promise.reject(NOT_OWNER))
  ),

  /**
   * @desc get board members
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @returns board
   */
  findMembers: (query, user) => (
    Board.findById(query.idBoard)
      .populate('idMembers')
      .populate('idOwner')
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => board.isUserAllowed(user && user.idUser) ? [].concat([], board.idMembers, board.idOwner) : Promise.reject(IS_PRIVATE))
  ),
  /**
   * @desc add member to the board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @returns board
   */
  addMember: (query, user) => (
    Board.findById(query.idBoard)
    .then(board => board ? board : Promise.reject(NOT_FOUND))
    .then(board => board.idOwner === (user && user.idUser) ? board.save({idMembers: [...board.idMembers, query.idMember]}) : Promise.reject(NOT_OWNER))
  ),
  /**
   * @desc remove member from the board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @returns board
   */
  removeMember: (query, user) => (
    Board.findById(query.idBoard)
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => (
        board.idOwner === (user && user.idUser) ?
        board.save({ idMembers: board.idMembers.filter( idMember => idMember != query.idMember)}) :
        Promise.reject(NOT_OWNER)
      ))
  ),

  findByOrganization: (query, user) => (
    Organization.findOne({
      _id: query.idOrganization,
    })
      .then(organization => organzation ? organization : Promise.reject(NOT_FOUND))
      .then(organization => organization.isUserAllowed(user && user.idUser) ? organization : Promise.reject(IS_PRIVATE))
      .then(organization => Board.find({ idOrganization: organization._id }))
  ),

  findByMember: (query, user) => (
      Board.find({ idMembers: { $contains: query.idMember}})
      .exec()
  )
}