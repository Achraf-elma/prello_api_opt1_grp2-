// Modules
const router = require('express').Router();

// Controllers
const boardController = require('../controllers/board');
const actionController = require('../controllers/action');
const cardController = require('../controllers/card');
const listController = require('../controllers/list');
const labelController = require('../controllers/label');


/**
 * @desc get one board
 * @param idBoard
 * @code 401 if board is private^ and user logged out
 * @code 403 if board is private^ and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idBoard([0-9a-fA-F]{24})', (req, res) => {
  let idBoard = req.params.idBoard ;
  // let = req.body
  // let = req.query
  let user = req.user ;

  // Delegate to controller;
  boardController.findOne({ idBoard }, user)
  .then(board => res.json(board))
  .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
  .catch(error => error === boardController.IS_PRIVATE && !user ? res.status(401).json({error}) : Promise.reject(error))
  .catch(error => error === boardController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
  .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({error}) : Promise.reject(error))
  .catch(error => console.error( error ) || res.sendStatus(500));
});

/**
 * @desc get first 20 actions of a board,
 *  unless page and perpage query params are provided.
 * @param idBoard
 * @param {Number} page, Query param, page number
 * @param {Number} perpage, Query param, number of action per page
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idBoard([0-9a-fA-F]{24})/actions', (req, res) => {
  let idBoard = req.params.idBoard;
  // let = req.body
  let page = req.query.page || 0;
  let perpage = req.query.perpage || 20;
  let user = req.user;
  actionController.findByBoard({ idBoard, page, perpage }, user)
    .then(actions => res.json(actions))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === actionController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === actionController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === actionController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc get all cards of a board,
 * @param idBoard
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idBoard([0-9a-fA-F]{24})/cards', (req, res) => {
  let idBoard = req.params.idBoard;
  let user = req.user;
  cardController.findByBoard({ idBoard }, user)
    .then(card => res.json(card))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === cardController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === cardController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === cardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc get all checkLists of a board,
 * @param idBoard
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
// router.get('/:idBoard([0-9a-fA-F]{24})/checklists', (req, res) => {
//   let idBoard = req.params.idBoard;
//   let user = req.user;
//   checkListController.findByBoard({ idBoard }, user)
//     .then(actions => res.json(actions))
//     .catch(error => error === checkListController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
//     .catch(error => error === checkListController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
//     .catch(error => error === checkListController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
//     .catch(error => console.error(error) || res.sendStatus(500));
// });

/**
 * @desc get all lists of a board,
 * @param idBoard
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idBoard([0-9a-fA-F]{24})/lists', (req, res) => {
  let idBoard = req.params.idBoard;
  let user = req.user;
  listController.findByBoard({ idBoard }, user)
    .then(lists => res.json(lists))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === listController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === listController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === listController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc get all boards of a user,
 * @param idUser
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
/*router.get('/', (req, res) => {
    let user = req.user;
    boardController.findByUser({ user }, boards)
      .then(boards => res.json(boards))
      .catch(error => error === listController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === listController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === listController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
  });*/

/**
 * @desc get members of a board,
 * @param idBoard
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idBoard([0-9a-fA-F]{24})/members', (req, res) => {
  let idBoard = req.params.idBoard;
  let user = req.user;
  boardController.findMembers({ idBoard }, user)
    .then(members => res.json(members))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc get all labels of a board,
 * @param idBoard
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idBoard([0-9a-fA-F]{24})/labels', (req, res) => {
  console.log("----------------ROUTE boards.js in label ")
  let idBoard = req.params.idBoard;
  let user = req.user;
  labelController.findByBoard({ idBoard }, user)
    .then(labels => res.json(labels))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    // .catch(error => error === labelController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
    // .catch(error => error === labelController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
    // .catch(error => error === labelController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc upsert a board,
 * @param idBoard
 * @code 401 if user logged out
 * @code 403 if board exit and user isn't board owner
 */
router.put('/:idBoard([0-9a-fA-F]{24})', (req, res) => {
  let idBoard = req.params.idBoard;
  let upsertBoard = {_id: idBoard, ...req.body};
  let user = req.user;
  boardController.upsert({ idBoard, upsertBoard }, user)
    .then(board => res.json(board))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_OWNER && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_OWNER && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});
/**
 * @desc disable a board,
 * @param idBoard
 * @param idMember
 * @code 401 if user isn't logged
 * @code 403 if user isn't board owner
 * @code 404 if board doesn't exist
 */
router.put('/:idBoard([0-9a-fA-F]{24})/member/:idMember([0-9a-fA-F]{24})', (req, res) => {
  let idBoard = req.params.idBoard;
  let idMember = req.params.idMember;
  let user = req.user;
  if (!user) {
    res.sendStatus(401);
  } else {
    boardController.addMember({ idBoard, idMember }, user)
      .then(board => res.status(204))
      .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_OWNER && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_OWNER && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
  }
});

router.put("/:idBoard([0-9a-fA-F]{24})/organizations/:idOrganization([0-9a-fA-F]{24})", (req, res) => {
  const idBoard = req.params.idBoard;
  const idOrganization = req.params.idOrganization;
  const user = req.user;
  boardController.addOrganization({ idBoard, idOrganization }, user)
    .then(board => res.sendStatus(204))
    .catch(error => error === boardController.NOT_OWNER && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_OWNER && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc create a board,
 * @param idBoard
 * @code 401 if user logged out or request uncomplete
 */
router.post('/', (req, res) => {
  let idBoard = req.params.idBoard;
  let createdBoard = req.body;
  let user = req.user;
  boardController.create({ idBoard, createdBoard }, user)
    .then(board => res.json(board))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_OWNER && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_OWNER && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});
// router.post('/:idBoard([0-9a-fA-F]{24})/labels');

/**
 * @desc create a list in a board,
 * @param idBoard
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
router.post('/:idBoard([0-9a-fA-F]{24})/lists', (req, res) => {
  let idBoard = req.params.idBoard;
  let createdList = req.body;
  let user = req.user;
  listController.create({ idBoard, createdList }, user)
    .then(list => res.json(list))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === listController.INCOMPLETE_BODY ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc disable a board,
 * @param idBoard
 * @code 401 if user isn't logged
 * @code 403 if user isn't board owner
 * @code 404 if board doesn't exist
 */
router.delete('/:idBoard([0-9a-fA-F]{24})', (req, res) => {
  let idBoard = req.params.idBoard;
  let user = req.user;
  boardController.disable({ idBoard }, user)
    .then(board => res.sendStatus(204))
    .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_OWNER && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_OWNER && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * @desc disable a board,
 * @param idBoard
 * @param idMember
 * @code 401 if user isn't logged
 * @code 403 if user isn't board owner
 * @code 404 if board doesn't exist
 */
router.delete('/:idBoard([0-9a-fA-F]{24})/member/:idMember([0-9a-fA-F]{24})', (req, res) => {
  let idBoard = req.params.idBoard;
  let idMember = req.params.idMember;
  let user = req.user;
  if(!user) {
    res.sendStatus(401);
  } else {
    boardController.removeMember({idBoard, idMember}, user)
      .then(board => res.status(204))
      .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_OWNER && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_OWNER && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
  }
});

module.exports = router;