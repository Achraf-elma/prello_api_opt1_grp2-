const Organization = require('../models/Organization');
const User = require('../models/User');

const IS_PRIVATE = "user cannot see target organization";
const NOT_OWNER = "Only the team admin is allowed to do that";
const NOT_FOUND = "No organization match given id";
const INCOMPLETE_BODY = "Informations sent were not enough";

module.exports = {
  IS_PRIVATE,
  NOT_FOUND,
  NOT_OWNER,
  INCOMPLETE_BODY,

  /**
  * @desc get one organization
  * @type {Promise}
  * @param {Object} queryIds, {idOrganization}
  * @param {Object} user, user information {idUser}
  * @throws IS_PRIVATE
  * @throws NOT_FOUND
  * @returns Organization
  */
  findOne: (query, user) => (
    Organization.findOne({
      _id: query.idOrganization,
    })
      .populate('idMembers', {hashpass: 0, saltpass: 0})
      .exec()
      .then(organization => organization || Promise.reject(NOT_FOUND))
      .then(organization => organization.isUserAllowed(user && user.idUser) ? organization : Promise.reject(IS_PRIVATE))
  ),
  findMemberships: (query, user) => (
    Organization.findById(query.idOrganization)
      .populate('idMembers')
      .populate('idAdmin')
      .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
      .then(organization => organization.isUserAllowed(user && user.idUser) ? [].concat([], organization.idMembers, organization.idAdmin) : Promise.reject(IS_PRIVATE))
  ),
  /* work */
  findByMember: (query, user) => (
    Organization.find({ $or: [{ idMembers: query.idMember }, { idOwner: query.idMember }] })
      .exec()
      .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
      .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
  ),
  /**
   * @desc upsert one organization
   * @type {Promise}
   * @param {Object} query, {idOrganization}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @returns organization
   */
  upsert: (query, user) => (
    Organization.findById(query.idOrganization)
      .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
      .then(organization => organization.idOwner.equals(user && user.idUser) ? organization.updateOne(query.upsertOrganization) : Promise.reject(NOT_OWNER))
      .catch(error => error === NOT_FOUND ? (new Organization(query.upsertOrganization)).save() : Promise.reject(error))
  ),
  addMember: (query, user) => (
    Promise.all([
      Organization.findById(query.idOrganization).exec()
        .then(organization => organization || Promise.reject(NOT_FOUND)),
      User.findOne({ email: query.emailMember }, { hashpass: 0, saltpass: 0 }).exec()
        .then(member => member || Promise.reject(NOT_FOUND))
    ])
      .then(([organization, member]) => (
        organization.idOwner.equals(user && user.idUser) ?
        organization.updateOne({ $push: { idMembers: member._id }}).then(ok => member) :
        Promise.reject(NOT_OWNER)
      ))
  ),
  removeMember: (query, user) => (
    Organization.findById(query.idOrganization)
      .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
      .then(organization => (
        organization.idOwner.equals(user && user.idUser) ||
        (user && user.idUser === query.idMember) ?
          organization.updateOne({ $pull: {idMembers: query.idMember }}) :
          Promise.reject(NOT_OWNER)
      ))
  ),
  removeOrganization: (query, user) => (
    Organization.deleteOne({_id:query.idOrganization, idOwner: user && user.idUser})
    .then( done => done.n || Promise.reject(NOT_OWNER))
  ),
  addBoard: (query, user) => (
    Organization.findById(query.idOrganization)
      .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
      .then(organization => organization.isUserAllowed(user && user.idUser) ? organization : Promise.reject(IS_PRIVATE))
      .then(organization => organization.save({ $push: { idBoards: query.idBoard } }))

  ),
  transferOwnership: (query, user) => (
    Promise.all([
      Organization.findById(query.idOrganization).exec()
        .then(organization => organization || Promise.reject(NOT_FOUND)),
      User.findById(query.idMember).exec()
        .then(member => member || Promise.reject(NOT_FOUND))
    ])
      .then(([organization, member]) => (
      organization.idOwner.equals(user && user.idUser) ?
      organization.updateOne({
        idMembers: (
          organization.idMembers
            .filter(member => !member.equals(query.idMember))
            .concat(user.idUser)
        ),
        idOwner: member.id,
      }) : Promise.reject(NOT_OWNER)
    ))
  )
}