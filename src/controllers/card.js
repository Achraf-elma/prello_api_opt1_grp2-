const Card = require('../models/Card');
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
            const card = new Card(data.description,
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
}

module.exports = cardController;