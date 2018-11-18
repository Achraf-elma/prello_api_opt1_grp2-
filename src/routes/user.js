// Modules
const router = require('express').Router();

// Controllers
const boardController = require('../controllers/board');
const organizationController = require('../controllers/organization');
const memberController = require('../controllers/user');

/**
 * @desc get one user
 * @param idMember
 * @code 404 if user doesn't exist
 */
router.get('/:idMember([0-9a-fA-F]{24})', (req, res) => {
  let idMember = req.params.idMember;
  // Delegate to controller;
  memberController.findOne({ idMember })
    .then(user => res.json(user))
    .catch(error => error === memberController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === memberController.NOT_FOUND ? res.status(404).json({error}) : Promise.reject(error))
    .catch(error => console.error( error ) || res.sendStatus(500));
});


  router.get('/:idMember([0-9a-fA-F]{24})/actions');

  router.get('/:idMember([0-9a-fA-F]{24})/boards', (req,res) => {
    let idMember = req.params.idMember;
    let user = req.user;
    if( !user ) {
      res.sendStatus(401)
    } else if ( user.idUser !== idMember ) {
      res.sendStatus(403)
    } else {
      boardController.findByMember({ idMember }, user)
        .then(boards => res.json(boards))
        .catch(error => error === boardController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
        .catch(error => error === boardController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
        .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
        .catch(error => console.error(error) || res.sendStatus(500));
    }
  });
  router.get('/:idMember([0-9a-fA-F]{24})/boardsInvited');
  router.get('/:idMember([0-9a-fA-F]{24})/cards');
  router.get('/:idMember([0-9a-fA-F]{24})/notifications');
  router.get('/:idMember([0-9a-fA-F]{24})/organizations', (req, res) => {
    let idMember = req.params.idMember;
    let user = req.user;
    if(!user) { res.sendStatus(401); }
    else if( user.idUser !== idMember ) { res.sendStatus(403); }
    else {
      organizationController.findByMember({ idMember }, user)
        .then(user => res.json(user))
        .catch(error => error === memberController.NOT_USER && !user ? res.status(401).json({ error }) : Promise.reject(error))
        .catch(error => error === memberController.NOT_USER && user ? res.status(403).json({ error }) : Promise.reject(error))
        .catch(error => error === memberController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
        .catch(error => console.error(error) || res.sendStatus(500));  
    }
  });
  router.get('/:idMember([0-9a-fA-F]{24})/organizationsInvited');


/**
 * @desc upsert a user,
 * @param idMember
 * @code 401 if user is logged out
 * @code 403 if user isn't the one changing himself
 */
router.put('/:idMember([0-9a-fA-F]{24})', (req, res) => {
    let idMember = req.params.idMember;
    let updatedMember = req.body;
    let user = req.user;
    memberController.upsert({ idMember, updatedMember }, user)
      .then(user => res.json(user))
      .catch(error => error === memberController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
      .catch(error => error === memberController.NOT_USER && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === memberController.NOT_USER && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === memberController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
  });



  
/**
 * @desc create a user,
 * @param idMember
 * @code 401 if user logged out or request uncomplete
 */
router.post('/', (req, res) => {
  let idMember = req.params.idMember;
  let createdUser = req.body;
  memberController.create({ idMember })
    .then(user => res.json(user))
    .catch(error => error === memberController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    .catch(error => error === memberController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => error === memberController.INCOMPLETE_BODY ? res.status(401).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});







module.exports = router;