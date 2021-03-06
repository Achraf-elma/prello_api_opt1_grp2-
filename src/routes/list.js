const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Board = require('../models/Board');

const seeder = require('../db/seeder.js');

//Controllers
const listController = require("../controllers/list");
const actionController = require('../controllers/action');
const cardController = require('../controllers/card');
const boardController = require('../controllers/board');


/*************************** GET ***************************/

/**
 * @desc get first 20 action of a list 
 * @param idList 
 * @param {Number} page, Query param, page number
 * @param {Number} perpage, Query param, number of action per page
 * @code 401 if list is in a private board and user logged out
 * @code 403 if list is in a private board and user isn't member
 * @code 404 if list does not exist or list is closed
 * @code 500 if internal server error
 */
//not necessary after all 
/*router.get('/:idList/actions', (req, res) => {
    let idList = req.params.idList;
    let page = req.user.page || 0;
    let perpage = req.query.perpage || 20;
    let user = req.user;

    actionController.findByList({idList, page, perpage}, user)
    .then(actions => res.json(actions))
    .catch(error => error === actionController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => error === actionController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
    .catch(error => error === actionController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});*/

/**
 * @desc get all the cards in a list
 * @param idList
 * @code 401 if board in which a card is is private and user logged out 
 * @code 403 if board in which a card is private and user is not a member of it
 * @code 404 if list does not exist 
 * @code 500 if internal server error
 */
router.get('/:idList/cards', (req, res) => {
    let idList = req.params.idBoard;
    let user = req.user;
    cardController.findByList( { idList }, user)
    .then(cards => res.json(cards))
    .catch(error => error === cardController.IS_PRIVATE && !user ? res.status(401).json( { error }) : Promise.reject(error))
    .catch(error => error === cardController.IS_PRIVATE && user ? res.status(403).json({ error}) : Promise.reject(error))
    .catch(error => error === cardController.NOT_FOUND ? res.json(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

router.get('/helloWorld', (req, res) => {
    seeder.seed().then(() => res.end("ok"))
    .catch(err => res.end(err));
  });
/*************************** PUT ***************************/

/**
 * @desc update the properties of a list
 * @param idList
 * @code 401 if user logged out
 */
router.put('/:idList', (req, res) => {

});

/**
 * @desc close a list
 */
router.put('/:idList/closed', (req, res) => {

});

/**
 * @desc rename a list
 */
router.put('/:idList/name', (req, res) => {

});

/**
 * @desc change the position of a list
 */
router.put('/:idList/pos', (req, res) => {

});

/**
 * @desc subscribe of unsubscribe from a list
 */
router.put('/:idList/subscribed', (req, res) => {

});


/*************************** POST ***************************/

/**
 * @desc create a new list on a board
 */
router.post('/', (req, res) => {
    seeder.seed().then(() => res.end("ok"))
    .catch(err => res.end(err));
    //res.json({message: "hello"});
});

/**
 * @desc archive all cards in a list
 */
router.post('/:idList/archiveAllCards', (req, res) => {

});


/**
 * @desc move all cards in a list
 */
router.post('/:idList/moveAllCards', (req, res) => {

});

// lists/djdiqjd
// returns all the lists of a user

/**
 * Get lists of a user
 */
router.get('/:idMember([0-9a-fA-F]{24})/lists', (req,res) => {
    let idMember = req.params.idMember;
    let user = req.user;
    listController.findByMember( {idMember}, user)
    .then(data => res.json(data))
    .catch(error => Promise.reject(error.name === "CastError" ? boardController.WRONG_PARAMS : error))
    .catch(error => Promise.reject(error.name === "ValidationError" ? boardController.WRONG_PARAMS : error))
});
  

module.exports = router;