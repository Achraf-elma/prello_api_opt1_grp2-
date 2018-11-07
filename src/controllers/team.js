const Team = require('../models/Team');

const IS_PRIVATE = "user cannot see target team";
const NOT_FOUND = "No team match given id";

module.exports = {
    IS_PRIVATE,
    NOT_FOUND,
    
    /**
    * @desc get one team
    * @type {Promise}
    * @param {Object} queryIds, {idTeam}
    * @param {Object} user, user information {idUser}
    * @throws IS_PRIVATE
    * @throws NOT_FOUND
    * @returns Team
    */
    findOne: (queryIds, user) => (
        Team.findOne({
            _id: queryIds.idTeam,
        })
        .then( team => team ? team : Promise.reject(NOT_FOUND))
        .then( team => team.isUserAllowed( user && user.idUser ) ? team : Promise.reject( IS_PRIVATE ))
        )
    }
    