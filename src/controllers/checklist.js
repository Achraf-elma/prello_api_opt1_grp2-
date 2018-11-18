const Card = require('../models/Card');
const CheckList = require('../models/CheckList');


const IS_PRIVATE = "user cannot see target board";
const NOT_FOUND = "No board match given id";
const DELETED = "The card has been deleted";

const WRONG_PARAMS = "Informations sent were not correct";

module.exports = {
  IS_PRIVATE,
  NOT_FOUND,
  WRONG_PARAMS,
  DELETED,

  /**
   * Find card checklist by idCard
   */
  findByCard: (query, user) => (
    Card.findOne({
        _id: query.idCard,
    })
    .then(card => card ? card : Promise.reject(NOT_FOUND))
    .then(card => {console.log(card.isClosed)
        card.isClosed ? card : Promise.reject(DELETED)})
    .then(card => CheckList.find({idCard: query.idCard}) )
    .then(checklists => checklists)

  ),



}