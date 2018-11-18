const Board = require('../models/Board');
const Organization = require('../models/Organization');
const Member = require('../models/User');

const IS_PRIVATE = "user cannot see target board";
const NOT_OWNER = "Only board owner is allowed to do that";
const NOT_FOUND = "No board match given id";
const WRONG_PARAMS = "Informations sent were not correct";

module.exports = {
  IS_PRIVATE,
  NOT_OWNER,
  NOT_FOUND,
  WRONG_PARAMS,
  /**
   * @desc get one board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @throws WRONG_PARAMS
   * @returns board
   */
  findOne: (query, user) => (
    Board.findOne({
      _id: query.idBoard,
    })
    .populate({path:"idOrganizations"})
    .populate({path:"idMembers",select: {hashpass:0,saltpass:0}})
    .exec()
    // .then( a => console.log(a))
    .then( board => board ? board : Promise.reject(NOT_FOUND))
    .then( board => board.isUserAllowed( user && user.idUser ) ? board : Promise.reject( IS_PRIVATE ))
    .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
    .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
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
   * @throws WRONG_PARAMS
   * @returns board
   */
  upsert:(query, user) => (
    Board.findById(query.idBoard)
      .exec()
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => board.idOwner.equals(user && user.idUser) ? board.save(query.upsertBoard) : Promise.reject(NOT_OWNER))
      .catch(error => error === NOT_FOUND ? (new Board(query.upsertBoard)).save() : Promise.reject(error))
      .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error ))
      .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),

  /**
   * @desc create a new board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @throws WRONG_PARAMS
   * @returns board
   */
  create:(query, user) => (
    (new Board(query.createdBoard)).save()
    .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
    .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),

  /**
   * @desc close a board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @throws WRONG_PARAMS
   * @returns board
   */
  disable:(query, user) => (
    Board.findById(query.idBoard)
    .exec()
    .then(board => board ? board : Promise.reject(NOT_FOUND))
    .then(board => board.idOwner.equals(user && user.idUser) ? board.save({ isClosed: true }) : Promise.reject(NOT_OWNER))
    .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
    .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),

  /**
   * @desc get board members
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws IS_PRIVATE
   * @throws NOT_FOUND
   * @throws WRONG_PARAMS
   * @returns board
   */
  findMembers: (query, user) => (
    Board.findById(query.idBoard)
      .populate('idMembers')
      .populate('idOwner')
      .exec()
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => board.isUserAllowed(user && user.idUser) ? [].concat([], board.idMembers, board.owners) : Promise.reject(IS_PRIVATE))
      .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
      .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),

  addOrganization: (query, user) => (
    Promise.all([
      Board.findById(query.idBoard).exec()
        .then(board => board || Promise.reject(NOT_FOUND)),
      Organization.findById(query.idOrganization).exec()
        .then(organization => organization || Promise.reject(NOT_FOUND))
    ])
      .then(([board, organization]) => (
        board.idOwner.equals(user && user.idUser) ?
          board.updateOne({ $push: { idOrganizations: organization._id } }).then(ok => organization) :
          Promise.reject(NOT_OWNER)
      ))
  ),
  /**
   * @desc remove member from the board
   * @type {Promise}
   * @param {Object} query, {idBoard}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @throws WRONG_PARAMS
   * @returns board
   */
  removeMember: (query, user) => (
    Board.findById(query.idBoard)
      .exec()
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => (
        board.idOwner.equals(user && user.idUser) ||
          (user && user.idUser === query.idMember) ?
          board.updateOne({ $pull: { idMembers: query.idMember } }) :
          Promise.reject(NOT_OWNER)
      ))
  ),

  findByOrganization: (query, user) => (
    Organization.findOne({
      _id: query.idOrganization,
    })
      .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
      .then(organization => organization.isUserAllowed(user && user.idUser) ? organization : Promise.reject(IS_PRIVATE))
      .then(organization => Board.find({ idOrganizations: organization._id }))
  ),

  findByMember: (query, user) => (
      Board.find({$or:[{ idOwner: query.idMember},{ idMembers: query.idMember}]})
      .exec()
      .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
      .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),
  addMember: (query, user) => (
    Promise.all([
      Board.findById(query.idBoard).exec()
        .then(board => board || Promise.reject(NOT_FOUND)),
      Member.findOne({ email: query.emailMember }, { hashpass: 0, saltpass: 0 }).exec()
        .then(member => member || Promise.reject(NOT_FOUND))
    ])
      .then(([board, member]) => (
        board.idOwner.equals(user && user.idUser) ?
          board.updateOne({ $push: { idMembers: member._id } }).then(ok => member) :
          Promise.reject(NOT_OWNER)
      ))
  ),
  transferOwnership: (query, user) => (
    Promise.all([
      Board.findById(query.idBoard).exec()
        .then(board => board || Promise.reject(NOT_FOUND)),
      Member.findById(query.idMember).exec()
        .then(member => member || Promise.reject(NOT_FOUND))
    ])
      .then(([board, member]) => (
        board.idOwner.equals(user && user.idUser) ?
          board.updateOne({
            idMembers: (
              board.idMembers
                .filter(member => !member.equals(query.idMember))
                .concat(user.idUser)
            ),
            idOwner: member.id,
          }) : Promise.reject(NOT_OWNER)
      ))
  ),
  removeOrganization: (query, user) => (
    Board.findById(query.idBoard)
      .exec()
      .then(board => board ? board : Promise.reject(NOT_FOUND))
      .then(board => (
        board.idOwner.equals(user && user.idUser) ||
          (user && user.idUser === query.idOrganization) ?
          board.updateOne({ $pull: { idOrganizations: query.idOrganization } }) :
          Promise.reject(NOT_OWNER)
      ))
  ),
}