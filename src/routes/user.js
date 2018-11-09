// Modules
const router = require('express').Router();

// Controllers
const userController = require('../controllers/user');
const boardController = require('../controllers/board');

/**
 * @desc get one user
 * @param idUser
 * @code 404 if user doesn't exist
 */
router.get('/:idUser', (req, res) => {
    let idUser = req.params.idUser ;
    // let = req.body
    // let = req.query
  
    // Delegate to controller;
    userController.findOne({ idUser })
    .then( user => res.json( user ))
    .catch(error => error === userController.NOT_FOUND ? res.status(404).json({error}) : Promise.reject(error))
    .catch(error => console.error( error ) || res.sendStatus(500));
  });


  router.get('/:idUser/actions');

  router.get('/:idUser/boards', (req,res) => {
    let idUser = req.params.idUser;
    let user = req.user;
    boardController.findByMember({ idUser }, user)
      .then(boards => res.json(boards))
      .catch(error => error === boardController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === boardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));

  });
  router.get('/:idUser/boardsInvited');
  router.get('/:idUser/cards');
  router.get('/:idUser/notifications');
  router.get('/:idUser/organizations');
  router.get('/:idUser/organizationsInvited');


/**
 * @desc upsert a user,
 * @param idUser
 * @code 401 if user is logged out
 * @code 403 if user isn't the one changing himself
 */
router.put('/:idUser', (req, res) => {
    let idUser = req.params.idUser;
    let upsertUser = req.body.params;
    let userToRequest = req.user;
    userController.upsert({ idUser, upsertUser }, userToRequest)
      .then(user => res.json(user))
      .catch(error => error === userController.NOT_USER && !userToRequest ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => error === userController.NOT_USER && userToRequest ? res.status(403).json({ error }) : Promise.reject(error))
      .catch(error => error === userController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
  });



  
/**
 * @desc create a user,
 * @param idUser
 * @code 401 if user logged out or request uncomplete
 */
/*
router.post('/', (req, res) => {
    let idUser = req.params.idUser;
    let createdUser = req.body;
    userController.create({ idUser })
      .then(user => res.json(user))
      .catch(error => error === userController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
      .catch(error => error === userController.INCOMPLETE_BODY ? res.status(401).json({ error }) : Promise.reject(error))
      .catch(error => console.error(error) || res.sendStatus(500));
  });*/