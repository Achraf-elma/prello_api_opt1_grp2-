const ADD_LIST_TO_BOARD = "@@board/ADD_LIST_TO_BOARD";
const listController = require('../controllers/list'); 

const dispatcher = (action, user) => new Promise((resolve, reject) => {
  switch(action.type){
    case ADD_LIST_TO_BOARD:
    console.log('dispatcher', action)
    const idBoard = action.payload.idBoard; 
    let createdList = action.payload ; 

    listController.createInBoard({ idBoard, createdList }, user)
    .then(list => console.log(list))
    .catch(error => reject('error dispatcher '+ action.type + error))

    default:
      return reject('Unhandled action: ' + JSON.stringify(action));
  }
});

module.exports = {
  dispatcher,
};