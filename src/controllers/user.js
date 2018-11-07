const User = require('../models/User');

const NOT_FOUND = "No user match given id";
const NOT_USER = "Only the user is allowed to do that";
const INCOMPLETE_BODY = "Informations sent were not enough";

//TODO:
/**
 * Delete user
 */

 /**
  * Set daily digest
  */

  /**
   * Set username
   */

   /**
    * Set password
    */


module.exports = {
    NOT_FOUND,
    NOT_USER,
    INCOMPLETE_BODY,
  /**
   * @desc get one user
   * @type {Promise}
   * @param {Object} query, {idUser}
   * @throws NOT_FOUND
   * @returns user
   */
  findOne: (query) => (
    User.findOne({
      _id: query.idUser,
    })
    //
    .then( user => user ? user : Promise.reject(NOT_FOUND))
  ),

  /**
   * @desc upsert one user
   * @type {Promise}
   * @param {Object} query, {idUser}
   * @param {Object} userToRequest, user information {idUser}
   * @throws NOT_USER
   * @throws NOT_FOUND
   * @returns user
   */
  upsert:(query, userToRequest) => (
    User.findById(query.idUser)
      .then(user => user ? user : Promise.reject(NOT_FOUND))
      .then(user => (user.idUser === userToRequest.idUser) ? user.save(query.updatedUser) : Promise.reject(NOT_USER))
      .catch(error => error === NOT_FOUND ? (new User(query.updatedUser)).save() : Promise.reject(error))
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
  ),

}