const ADD_LIST_TO_BOARD = "@@board/ADD_LIST_TO_BOARD";
const ADD_CARD_TO_LIST = "@@list/ADD_CARD_TO_LIST";
const SET_CARD_NAME = "@@card/SET_CARD_NAME";
const SET_CARD_DESC = "@@card/SET_CARD_DESC";
const SET_CARD_DUE_DATE = "@@card/SET_CARD_DUE_DATE"
const SET_CARD_DUE_COMPLETE = "@@card/SET_CARD_DUE_COMPLETE"
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
    var idBoard = action.payload.idBoard; 
    let createdList = action.payload ; 

    return listController.createInBoard({ idBoard, createdList }, user)
    .then(list => console.log(list))
    .catch(error => reject('error dispatcher '+ action.type + error))

    // -----------------Add Card to list -----------------
    case ADD_CARD_TO_LIST:
    var idList= action.payload.idList; 
    let createdCard = action.payload ; 

    return cardController.createInList ({ idList, createdCard })
    .catch(error => reject('error dispatcher '+ action.type + error))
    break; 
    // -----------------UPDATE CARD ACTIONS -----------------
    case SET_CARD_NAME:
    var idCard= action.payload.id; 
    var newValue = action.payload.name ; 

    return   cardController.updateCardName ({ idCard, newValue })
      .catch(error => reject('error dispatcher '+ action.type + error))
      break; 
    // -----------------Set card desc-----------------

    case SET_CARD_DESC:
      var idCard= action.payload.id; 
      var newValue = action.payload.desc ; 
      return   cardController.updateCardDesc({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))
      break; 
    // -----------------Set card due date-----------------

    case SET_CARD_DUE_DATE:
    console.log('SET CARD DUE DATE ', action)
      var idCard= action.payload.id; 
      var newValue = action.payload.dueDate ; 

      return  cardController.updateCardDuedate ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))
      break; 
  // -----------------Set card all day-----------------

  case SET_CARD_ALL_DAY:
  console.log('SET CARD ALL DAY ', action)
    var idCard= action.payload.id; 
    var newValue = action.payload.allDay ; 

    return  cardController.updateCardAllDay({ idCard, newValue })
    .then(card => console.log(card))
    .catch(error => reject('error dispatcher '+ action.type + error))
    break; 
     // -----------------Set card position-----------------

    case SET_CARD_POSITION:
    console.log('SET CARD POSITION', action)
      var idCard= action.payload.id; 
      var newValue = action.payload.position ; 

      return cardController.updateCardPosition ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))
      break; 
     // -----------------SET CARD CLOSED -----------------

    case SET_CARD_CLOSED:
    console.log('SET NAME TO CARD', action)
      var idCard= action.payload.id; 
      var newValue = action.payload.closed ; 
      return cardController.updateCardClosed ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))
      break; 
      // -----------------SET CARD DUECOMPLETE -----------------

      case SET_CARD_DUE_COMPLETE:
    console.log('SET CARD DUE COMPLETE', action)
      var idCard= action.payload.id; 
      var newValue = action.payload.closed ; 
      return cardController.updateCardDueComplete ({ idCard, newValue })
      .then(card => console.log(card))
      .catch(error => reject('error dispatcher '+ action.type + error))
      break; 


    case SET_CARD_LIST:
    case ASSIGN_LABEL_TO_CARD:
    case ASSIGN_CHECKLIST_TO_CARD:
    case ASSIGN_MEMBER_TO_CARD:







    // ----------------- DEFAULT --------------------

    default:
      return reject('Unhandllllled action: ' + JSON.stringify(action));
  }
});

module.exports = {
  dispatcher,
};