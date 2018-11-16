const ADD_LIST_TO_BOARD = "@@board/ADD_LIST_TO_BOARD";
const ADD_CARD_TO_LIST = "@@list/ADD_CARD_TO_LIST";
const SET_CARD_NAME = "@@card/SET_CARD_NAME";
const SET_CARD_DESC = "@@card/SET_CARD_DESC";
const SET_CARD_DUE_DATE = "@@card/SET_CARD_DUE_DATE"
const SET_CARD_POSITION = "@@card/SET_CARD_POSITION"
const SET_CARD_CLOSED = "@@card/SET_CARD_CLOSED"
const SET_CARD_LIST = "@@card/SET_CARD_LIST"
const SET_CARD_BOARD = "@@card/SET_CARD_BOARD"
const ASSIGN_MEMBER_TO_CARD = "@@card/ASSIGN_MEMBER_TO_CARD ";
const ASSIGN_LABEL_TO_CARD = "@@card/ASSIGN_LABEL_TO_CARD ";
const ASSIGN_CHECKLIST_TO_CARD = "@@card/ASSIGN_CHECKLIST_TO_CARD ";


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

    // -----------------UPDATE CARD ACTIONS -----------------
    case SET_CARD_NAME:
      const idCard= action.payload.id; 
      const newValue = action.payload.name ; 

      cardController.updateCardName ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))

    case SET_CARD_DESC:
      const idCard= action.payload.id; 
      const newValue = action.payload.desc ; 
      cardController.updateCardDesc ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))

    case SET_CARD_DUE_DATE:
    console.log('SET NAME TO CARD', action)
      const idCard= action.payload.id; 
      const newValue = action.payload.dueDate ; 

      cardController.updateCardName ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))

    case SET_CARD_POSITION:
    console.log('SET NAME TO CARD', action)
      const idCard= action.payload.id; 
      const newValue = action.payload.position ; 

      cardController.updateCardName ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))

    case SET_CARD_CLOSED:
    console.log('SET NAME TO CARD', action)
      const idCard= action.payload.id; 
      const newValue = action.payload.closed ; 

      cardController.updateCardClosed ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))
    case SET_CARD_LIST:
    case ASSIGN_LABEL_TO_CARD:
    case ASSIGN_CHECKLIST_TO_CARD:
    case ASSIGN_MEMBER_TO_CARD:







    // ----------------- DEFAULT --------------------

    default:
      return reject('Unhandled action: ' + JSON.stringify(action));
  }
});

module.exports = {
  dispatcher,
};