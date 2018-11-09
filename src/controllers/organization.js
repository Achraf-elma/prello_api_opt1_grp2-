const Organization = require('../models/Organization');

const IS_PRIVATE = "user cannot see target organization";
const NOT_FOUND = "No organization match given id";

module.exports = {
    IS_PRIVATE,
    NOT_FOUND,
    
    /**
    * @desc get one organization
    * @type {Promise}
    * @param {Object} queryIds, {idOrganization}
    * @param {Object} user, user information {idUser}
    * @throws IS_PRIVATE
    * @throws NOT_FOUND
    * @returns Organization
    */
    findOne: (queryIds, user) => (
        Organization.findOne({
            _id: queryIds.idOrganization,
        })
        .then( organization => organization ? organization : Promise.reject(NOT_FOUND))
        .then( organization => organization.isUserAllowed( user && user.idUser ) ? organization : Promise.reject( IS_PRIVATE ))
        )
    }
    