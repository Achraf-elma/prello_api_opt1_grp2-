const Organization = require('../models/Organization');

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
        .then( organization => organization ? organization : Promise.reject(NOT_FOUND))
        .then( organization => organization.isUserAllowed( user && user.idUser ) ? organization : Promise.reject( IS_PRIVATE ))
        ),
    findBoards: (query, user) => (
        Organization.findById(query.idOrganization)
          .populate('idMembers')
          .populate('idOwner')
          .then(organization => organization ? board : Promise.reject(NOT_FOUND))
          .then(board => board.isUserAllowed(user && user.idUser) ? [].concat([], board.idMembers, board.idOwner) : Promise.reject(IS_PRIVATE))
      ),

    findMemberships:(query, user) => (
        Organization.findById(query.idOrganization)
          .populate('idMembers')
          .populate('idAdmin')
          .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
          .then(organization => organization.isUserAllowed(user && user.idUser) ? [].concat([], organization.idMembers, organization.idAdmin) : Promise.reject(IS_PRIVATE))
      ),
    findByMember: (query, user) => (
      Organization.find({ idMembers: query.idMember })
        .exec()
        .catch(error => Promise.reject(error.name === "CastError" ? WRONG_PARAMS : error))
        .catch(error => Promise.reject(error.name === "ValidationError" ? WRONG_PARAMS : error))
    )

  /**
   * @desc upsert one organization
   * @type {Promise}
   * @param {Object} query, {idOrganization}
   * @param {Object} user, user information {idUser}
   * @throws NOT_OWNER
   * @throws NOT_FOUND
   * @returns organization
   */
  upsert:(query, user) => (
    Organization.findById(query.idOrganization)
      .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
      .then(organization => organization.idAdmin === (user && user.idUser) ? organization.save(query.updatedOrganization) : Promise.reject(NOT_ADMIN))
      .catch(error => error === NOT_FOUND ? (new Organization(query.updatedOrganization)).save() : Promise.reject(error))
  ),


  addMember:(query, user) => (
    Organization.findById(query.idOrganization)
    .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
    .then(organization => organization.idAdmin === (user && user.idUser) ? organization.save({idMembers: [...organization.idMembers, query.idMember]}) : Promise.reject(NOT_ADMIN))
  ),

  create:(query, user) => (
    (new Organization(query.createdOrganization)).save()
  ),
  delete:(query, user)=> (
    Organization.findById(query.idOrganization)
    .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
    .then(organization => organization.idAdmin === (user && user.idUser) ? organization.remove() : Promise.reject(NOT_ADMIN))
  ),
  
  removeMember:(query, user) => (
    Organization.findById(query.idOrganization)
      .then(organization => organization ? organization : Promise.reject(NOT_FOUND))
      .then(organization => (
        organization.idAdmin === (user && user.idUser) ?
        organization.save({ idMembers: organization.idMembers.filter( idMember => idMember != query.idMember)}) :
        Promise.reject(NOT_ADMIN)
      ))
  ),



}
    