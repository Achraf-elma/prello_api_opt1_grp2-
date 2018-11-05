const Card = require('../models/Card');
const requestError = require('../util/errorHandler');
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
    }/*,
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