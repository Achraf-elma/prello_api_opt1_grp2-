const ADD_LIST_TO_BOARD = "@@board/ADD_LIST_TO_BOARD";
const ADD_CARD_TO_LIST = "@@list/ADD_CARD_TO_LIST";

const listController = require('../controllers/list'); 
const cardController = require('../controllers/card'); 


const dispatcher = (action, user) => new Promise((resolve, reject) => {
  switch(action.type){
    // ----------------- ADDING --------------------
    // -----------------Add List to board -----------------
    case ADD_LIST_TO_BOARD:
    console.log('dispatcher', action)
    const idBoard = action.payload.idBoard; 
    let createdList = action.payload ; 

    listController.createInBoard({ idBoard, createdList }, user)
    .then(list => console.log(list))
    .catch(error => reject('error dispatcher '+ action.type + error))

    // -----------------Add Card to list -----------------
    case ADD_CARD_TO_LIST:
    console.log('dispatcher add CARD TO LIST', action)
    const idList= action.payload.idList; 
    let createdCard = action.payload ; 

    cardController.createInList ({ idList, createdCard })
    .then(card => console.log(card))
    .catch(error => reject('error dispatcher '+ action.type + error))

    // ----------------- DEFAULT --------------------

    default:
      return reject('Unhandled action: ' + JSON.stringify(action));
  }
});

module.exports = {
  dispatcher,
};