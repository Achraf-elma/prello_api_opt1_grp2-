// Modules
const router = require('express').Router();

// Controllers
const boardController = require('../controllers/board');

/**
 * @desc get one board
 * @param idBoard
 * @code 401 if board is private^ and user logged out
 * @code 403 if board is private^ and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idBoard', (req, res) => {
  const idBoard = req.params.idBoard ;
  // const = req.body
  // const = req.query
  const user = req.user ;

  // Delegate to controller;
  boardController.findOne({ idBoard }, user)
  .then( board => res.json( board ))
  .catch(error => error === boardController.IS_PRIVATE && user ? res.status(401).json({error}) : Promise.reject(error))
  .catch(error => error === boardController.IS_PRIVATE && !user ? res.status(403).json({ error }) : Promise.reject(error))
  .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({error}) : Promise.reject(error))
  .catch(error => console.error( error ) || res.sendStatus(500));
});


router.get('/:idBoard/actions');
router.get('/:idBoard/cards');
router.get('/:idBoard/checklists');
router.get('/:idBoard/lists');
router.get('/:idBoard/members');

router.put('/:idBoard');
router.put('/:idBoard/members');

router.post('/');
router.post('/:idBoard/labels');
router.post('/:idBoard/lists');

router.delete('/:idBoard');
router.delete('/:idBoard/members/:idMember');

module.exports = router;