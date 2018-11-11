const ADD_LIST_TO_BOARD = "@@board/ADD_LIST_TO_BOARD";

const dispatcher = (action, user) => new Promise((resolve, reject) => {
  switch(action.type){
    case ADD_LIST_TO_BOARD:
    default:
      return reject('Unhandled action: ' + JSON.stringify(action));
  }
});

module.exports = {
  dispatcher,
};