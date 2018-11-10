const User = require('../models/User');

const NOT_FOUND = "No user match given id";
const NOT_USER = "Only the user is allowed to do that";
const WRONG_PARAMS = "Informations sent were not correct";

module.exports = {
    NOT_FOUND,
    NOT_USER,
    WRONG_PARAMS,
  /**
   * @desc get one user
   * @type {Promise}
   * @param {Object} query, {idUser}
   * @throws NOT_FOUND
   * @returns user
   */
  findOne: (query) => (
    User.findOne({
      _id: query.idMember,
    }, { hashpass:0, saltpass:0 })
    .exec()
    .then( user => user ? user : Promise.reject(NOT_FOUND))
    .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
    .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),

  /**
   * @desc upsert one user
   * @type {Promise}
   * @param {Object} query, {idMember, updatedMember}
   * @param {Object} user, user information {idUser}
   * @throws NOT_USER
   * @throws NOT_FOUND
   * @returns user
   */
  upsert:({idMember, updatedMember}, user = {}) => (
    User.findById(idMember)
    .exec()
      .then(member => member ? member : Promise.reject(NOT_FOUND))
      .then(member => (member._id.equals(user.idUser)) ? member.set(updatedMember) : Promise.reject(NOT_USER))
      .catch(error => error === NOT_FOUND ? (new User({ ...updatedMember, _id: idMember })) : Promise.reject(error))
      .then(member => updatedMember.password ? member.setPassword(updatedMember.password).save() : member.save())
      .then(member => { delete member._doc.hashpass; delete member._doc.saltpass; return member})
      .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
      .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),


  /**
   * @desc create a new user
   * @type {Promise}
   * @param {Object} query, {idUser}
   * @throws NOT_FOUND
   * @returns user
   */
  create:(query) => (
    (new User(query.createdUser)).save()
    .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
    .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),

}