const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');
const requestError = require('../util/errorHandler');

const IS_PRIVATE = "user cannot see target board";
const NOT_FOUND = "No board match given id";

//TODO:
/**
* Add card --> add card in this list
*          --> add this card to the users concerned
*          --> add this card to this board 
*/

/**
* find by list
*/

/**
* update card --> change
*/

/**
* move a card to a list --> change the id list of the card
*/

/**
* create card : just to test
*/
const cardController = {
    IS_PRIVATE: "user cannot see target board",
    NOT_FOUND: "No board match given id",
    create: function (data)  {
        try{
            const card = new Card(data.desc,
                data.name,
                data.dueDate,
                data.position);
                card.save();
                return card;
            }
            catch (err) {
                //check if error of field or server error
                if(err.status){
                    throw err;
                }
                throw new requestError(500, 'Internal server error');
                
            }
        },
        /**
        * @desc get cards of a board
        * @type {Promise}
        * @param {Object} query, {idBoard}
        * @param {Object} user, user information {idUser}
        * @throws IS_PRIVATE
        * @throws NOT_FOUND
        * @returns [action]
        */
        findByBoard: (query, user) =>  (
            Board.findOne({
                _id: query.idBoard,
            })
            // .then( a => console.log(a))
            .then(board => board ? board : Promise.reject(NOT_FOUND))
            .then(board => board.isUserAllowed(user && user.idUser) ? board : Promise.reject(IS_PRIVATE))
            .then(board => Card.find({ idBoard: board._id }))
            ),
            
            /**
            * @desc
            * @param {boards?, lists?, labels?, duedate?, duecomplete, perpage, page}
            */
            findWithFilters: (query, user) => {
                return Board.find({ $or: [{ idOwner: user && user.idUser }, { idMembers: user && user.idUser }] })
                .then(data => console.log(data) ||Card.find({ idBoard: { $in: data.map(x => x._id) } }).exec())
                .catch(error => Promise.reject(error.name === "CastError") ? boardController.WRONG_PARAMS : error)
                .catch(error => Promise.reject(error.name === "ValidationError" ? boardController.WRONG_PARAMS : error))
            },
            /*,
            findAll: () => { 
                cardModel.find({},function (err, cards){
                    if (err){
                        if(err.status){
                            throw err;
                        }
                        throw new requestError(500, 'Internal server error');
                    }
                    else{
                        return cards;
                    }
                }
            }*/
            
            /**
            * @desc get cards of a board
            * @type {Promise}
            * @param {Object} query, {idList}
            * @param {Object} user, user information {idUser}
            */
            findByList: (query, user) => {
                List.findOne({
                    _id: query.idList,
                })
                .then(list => list ? list : Promise.reject(NOT_FOUND))
                .then(list => Board.findOne({
                    _id: list.idBoard,
                })
                .then( board => board.isUserAllowed(user && user.idUser) ? board : Promise.reject(IS_PRIVATE))
                .then( board => Card.find({idList: query.idList}) )           
                )
            },
            
            /**
            * @desc add card in board 
            * @type {Promise}
            * @param {Object} query, {idList}
            * @throws IS_PRIVATE
            * @throws NOT_FOUND
            * @returns [action]
            */
            createInList: (query, user) => (
                List.findOne({
                    _id: query.idList,
                })
                // .then( a => console.log(a))
                .then(list => list ? list : Promise.reject(NOT_FOUND))
                .then(list => (new Card({_id : query.createdCard.id,...query.createdCard, idList: list._id })).save()) 
      
                ),
                
                
                
                /**
                * @desc update name in a card
                * @type {Promise}
                * @param {Object} query, {id}
                * @throws NOT_FOUND
                * @returns [action]
                */
                updateCardName: (query, user) => (
                    Card.findOne({
                        _id: query.idCard,
                    })
                    .then(card => card ? card : Promise.reject(NOT_FOUND))
                    .then(card => { 
                        card.name = query.newValue ;
                        card.save();
                    })),


            /**
   * @desc update desc in a card
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  updateCardDesc: (query, user) => (
    Card.findOne({
      _id: query.idCard,
    })
    .then(card => { 
        card.desc = query.newValue ;
        card.save();
    })
      .then(card => {
        card ? card : Promise.reject(NOT_FOUND)})
     ),


   /**
   * @desc update duedate in a card
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  updateCardDuedate: (query, user) => (
    Card.findOne({
        _id: query.idCard,
      })
      .then(card => { 
          card.dueDate = query.newValue ;
          card.save();
      })
        .then(card => {
          card ? card : Promise.reject(NOT_FOUND)})
       ),

     /**
   * @desc update closed in a card
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  updateCardAllDay: (query, user) => (
    Card.findOne({
        _id: query.idCard,
      })
      .then(card => { 
          card.allDay = query.newValue ;
          card.save();
      })
        .then(card => {
          card ? card : Promise.reject(NOT_FOUND)})
       ),

   /**
   * @desc update closed in a card
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  updateCardClosed: (query, user) => (
    Card.findOne({
        _id: query.idCard,
      })
      .then(card => { 
          card.isClosed = query.newValue ;
          card.save();
      })
        .then(card => {
          card ? card : Promise.reject(NOT_FOUND)})
       ),

  /**
   * @desc update position in a card
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  updateCardPosition: (query, user) => (
    Card.findOne({
      _id: query.idCard,
    })
      .then(card => card ? card : Promise.reject(NOT_FOUND))
      .then(card => ({ ...card, position : query.newValue}.save() )
  )),


   /**
   * @desc update due complete in a card
   * @type {Promise}
   * @param {Object} query, {id}
   * @throws NOT_FOUND
   * @returns [action]
   */
  updateCardDueComplete: (query, user) => (
    Card.findOne({

            _id: query.idCard,
          })
          .then(card => { 
              card.dueComplete = query.newValue ;
              card.save();
          })
            .then(card => {
              card ? card : Promise.reject(NOT_FOUND)})
           ),


 }
                
module.exports = cardController;
                