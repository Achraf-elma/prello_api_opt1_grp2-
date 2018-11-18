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
    .then(card => !card.isClosed ? card : Promise.reject(DELETED))
    .then(card => CheckList.find({idCard: query.idCard}))
    .then(checklists => checklists)

  ),


  /**
   * @desc add check to card 
   * @type {Promise}
   * @param {Object} query, {idCard}
   * @throws NOT_FOUND
   * @returns [action]
   */
  createInCard: (query, user) => (
    Card.findOne({
      _id: query.idCard,
    })
      .then(card => card ? card : Promise.reject(NOT_FOUND))
      .then(card => (new CheckList({_id : query.createdCheck.id , ...query.createdCheck, idCard: query.idCard})).save())
      .catch(comment => console.log(comment))
     
  ),

  /**
   * @desc update checklistitem in a checklist
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  addCheckListItem: (query, user) => (
    CheckList.findOne({
      _id: query.idCheckList,
    })
      .then(check => check ? check : Promise.reject(NOT_FOUND))
      .then(check => ({ ...check, checkListItems : [...card.checkListItems, query.newItem]}.save() )
  )),

/**
   * @desc update checklistitem in a checklist
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  deleteCheckListItem: (query, user) => (
      CheckList.findOne({
        _id: query.idCheckList,
      })
        .then(check => check ? check : Promise.reject(NOT_FOUND))
        .then(check => check.filter(item=> item.id !== query.idItemToDelete)).save())
      ,
  

  /**
   * @desc update checklistitem in a checklist
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  /*updateCheckListItemCompleted: (query, user) => (
    Card.findOne({
      _id: query.idCard,
    })
      .then(card => card ? card : Promise.reject(NOT_FOUND))
      .then(card => ({ ...card, position : query.newValue}.save() )
  )),*/

  


}