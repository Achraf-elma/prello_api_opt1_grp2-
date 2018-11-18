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
const SET_CARD_ALL_DAY = "@@card/SET_CARD_ALL_DAY"
const ADD_LABEL_TO_CARD = "@@label/ADD_LABEL_TO_CARD";
const ADD_SET_LABEL_TO_BOARD = "@@board/ADD_SET_LABEL_TO_BOARD";
const SET_LIST_NAME = "@@list/SET_LIST_NAME";
const SET_LIST_CLOSED = "@@list/SET_LIST_CLOSED"; 
const ADD_COMMENT_TO_CARD = "@@COMMENT/ADD_COMMENT_TO_CARD"; 

const listController = require('../controllers/list');
const cardController = require('../controllers/card');
const labelController = require('../controllers/label');
const commentController = require('../controllers/comment');


const dispatcher = (action, user) => new Promise((resolve, reject) => {
  switch (action.type) {
    // ----------------- ADDING --------------------
    // -----------------Add List to board -----------------
    case ADD_LIST_TO_BOARD:
      var idBoard = action.payload.idBoard;
      let createdList = {_id: action.payload.idList, ...action.payload};

      return listController.createInBoard({ idBoard, createdList }, user).then(resolve, reject);

    // -----------------Add Card to list -----------------
    case ADD_CARD_TO_LIST:
    var idList = action.payload.idList;
    let createdCard = action.payload;
    
    return cardController.createInList({ idList, createdCard }).then(resolve, reject);
    
    // -----------------Add comment to Card -----------------
    case ADD_COMMENT_TO_CARD:
    var idCard = action.payload.idCard;
    var createdComment= action.payload;
    return commentController.createInCard({ idCard, createdComment }).then(resolve, reject);
    
    // -----------------Add Label to Card -----------------
    case ADD_LABEL_TO_CARD:
    var idCard = action.payload.idCard;
    var createdLabel = action.payload;
    return labelController.createInCard({ idCard, createdLabel }).then(resolve, reject);
    
    // -----------------Add Label to Board -----------------
    case ADD_SET_LABEL_TO_BOARD:
    console.log("-------------- dispatcher.js add labeltobaord")
    var idBoard = action.payload.idBoard;
    var createdLabel = action.payload;
    
    return labelController.setLabelInBoard({ idBoard, createdLabel }).then(resolve, reject);
    // -----------------UPDATE CARD ACTIONS -----------------
    case SET_CARD_NAME:
    var idCard = action.payload.id;
    var newValue = action.payload.name;
    
    return cardController.updateCardName({ idCard, newValue }).then(resolve, reject);
    // -----------------Set card desc-----------------
    
    case SET_CARD_DESC:
    var idCard = action.payload.id;
    var newValue = action.payload.desc;
    return cardController.updateCardDesc({ idCard, newValue }).then(resolve, reject);
    
    
    // -----------------Set List name-----------------
    
    case SET_LIST_NAME:
    var idList = action.payload.id;
    var newValue = action.payload.name;
    return listController.updateListName({ idList, newValue }).then(resolve, reject);
    
    // -----------------Set List closed-----------------
    
    case SET_LIST_CLOSED:
    var idList = action.payload.id;
    var newValue = action.payload.isClosed;
    return listController.updateListClosed({ idList, newValue }).then(resolve, reject);
    // -----------------Set card due date-----------------
    
    case SET_CARD_DUE_DATE:
    console.log('SET CARD DUE DATE ', action)
    var idCard = action.payload.id;
    var newValue = action.payload.dueDate;
    
    return cardController.updateCardDuedate({ idCard, newValue }).then(resolve, reject);
    // -----------------Set card all day-----------------
    
    case SET_CARD_ALL_DAY:
    console.log('SET CARD ALL DAY ', action)
    var idCard = action.payload.id;
    var newValue = action.payload.allDay;
    
    return cardController.updateCardAllDay({ idCard, newValue }).then(resolve, reject);
    // -----------------Set card position-----------------
    
    case SET_CARD_POSITION:
    console.log('SET CARD POSITION', action)
    var idCard = action.payload.id;
    var newValue = action.payload.position;
    
    return cardController.updateCardPosition({ idCard, newValue }).then(resolve, reject);
    // -----------------SET CARD CLOSED -----------------
    
    case SET_CARD_CLOSED:
    console.log('SET NAME TO CARD', action)
    var idCard = action.payload.id;
    var newValue = action.payload.closed;
    return cardController.updateCardClosed({ idCard, newValue }).then(resolve, reject);
    
    // -----------------SET CARD DUECOMPLETE -----------------
    
    case SET_CARD_DUE_COMPLETE:
    console.log('SET CARD DUE COMPLETE', action)
    var idCard = action.payload.id;
    var newValue = action.payload.closed;
    return cardController.updateCardDueComplete({ idCard, newValue }).then(resolve, reject);
    
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