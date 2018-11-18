const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card')
const commentController = require('../controllers/comment')
const checklistController = require('../controllers/checklist')

/*************************** GET ***************************/

/**
 * Get a card given its id
 */
router.get('/{id}', (req, res) => {
  res.send('ID');
});

/**
 * Get cards given 
 */
// 
//   let user = req.user;
//   let {
//     boards,
//     lists,
//     labels,
//     duedate,
//     page,
//     perpage,
//     duecomplete,
//   } = req.query;
  
//   let query = {
//     boards: boards && boards.split(','),
//     lists: lists && lists.split(','),
//     labels: labels && labels.split(','),
//     duedate: (duedate%1 > -1) ? duedate*1 : undefined,
//     page: (page % 1 > -1) ? page * 1 : undefined,
//     perpage: (perpage % 1 > -1) ? perpage * 1 : undefined,
//     duecomplete: duecomplete === "true" || (duecomplete === "false" ? false : undefined),
//   };
//   cardController.findWithFilters( query, user )
//   .then(cards => res.json(cards))
//   .catch( error => console.error(error) || res.sendStatus(500));
// });



/**
 * Get a specific property of a card given its id
 */
router.get('/{id}/{field}', (req, res) => {
  res.send('id/field');
});

/**
 * Get the actions carried out on a card given its id
 */
router.get('/{id}/actions', (req, res) => {
  res.send('id/actions');
});

/**
 * Get the board of a given card
 */
router.get('/{id}/board', (req, res) => {
  res.send('id/board');
});

/**
 * Get the checkItem completed for a given card
 */
router.get('/{id}/checkItemStates', (req, res) => {
  res.send('id/checkItemStates');
});


/**
 * Get the checklist(s) for a given card
 */
router.get('/{id}/checklists', (req, res) => {
  res.send('id/checklists');
});

/**
 * Get the card(s) for a given card
 */
router.get('/{id}/comments', (req, res) => {
  res.send('id/comments');
});


/**
 * Get a specific checkItem on a card
 */
router.get('/{id}/checkItem/{idCheckItem}', (req, res) => {
  res.send('id/checkItem/idCheckItem');
});


/**
 * Get the list in which a card is
 */
router.get('/{id}/list}', (req, res) => {
  res.send('id/list');
});


/**
 * Get the members on a given card
 */
router.get('/{id}/members}', (req, res) => {
  res.send('id/members');
});

/**
 * Get the members on a given card
 */
router.get('/{id}/members}', (req, res) => {
  res.send('id/members');
});



/*************************** PUT ***************************/


 /**
  * Update a card given its id
  */
 router.put('/{id}', (req, res) => {
  res.send('id');
});

/**
 * Update a comment on a card
 */
router.put('/{id}/actions/comments', (req, res) => {
  res.send('id/actions/comments');
});


/**
 * Update an item in a checklist on a given card
 */
router.put('/{idCard}/checklist/{idChecklist}/checkItem/{idCheckItem}', (req, res) => {
  res.send('/cards/{id}/checkItem/{idCheckItem');
});



/*************************** POST ***************************/

/**
 * Create a new card
 */
router.post('/', (req, res) => {
  res.send(cardController.create(req));
});

/**
 * Add a new comment on a card
 */
router.post('/{id}/actions/comments', (req, res) => {
  res.send('Add a new comment to a card');
});

/**
 * Create a new checklist on a card
 */
router.post('/{id}/checklists', (req, res) => {
  res.send('Create a new checklist on a card');
});

/**
 * Add a label to a card
 */
router.post('/{id}/idLabels', (req, res) => {
  res.send('Add a label to a card');
});

/**
 * Add a member to a card
 */
router.post('/{id}/idMembers', (req, res) => {
  res.send('Add a member to a card');
});

/**
 * Add a new label to a card
 */
router.post('/{id}/labels', (req, res) => {
  res.send('Add a label to a card');
});

/**
 * Mark notification about this card as read
 */
router.post('/{id}/markAssociatedNotificationsRead', (req, res) => {
  res.send('Mark notification about this card as read');
});





/*************************** DELETE ***************************/

/**
 * Delete a card
 */
router.post('/{id}', (req, res) => {
  res.send('delete a card');
});

/**
 * Delete a comment
 */
router.post('/{id}/actions/{idAction}/comments', (req, res) => {
  res.send('delete a comment');
});

/**
 * Delete a checklist item
 */
router.post('/{id}/checkItem/{idCheckItem}', (req, res) => {
  res.send('delete a checklist item');
});

/**
 * Delete a checklist item from a card
 */
router.post('/{id}/checklists/{idChecklist}', (req, res) => {
  res.send('delete a checklist item from a card');
});

/**
 * Remove a label from a card
 */
router.post('/{id}/idLabels/{idLabel}', (req, res) => {
  res.send('Remove a label from a card');
});

/**
 * Remove a member from a card
 */
router.post('/{id}/idMembers/{idMember}', (req, res) => {
  res.send('Remove a member from a card');
});

/**
 * @desc get all comments of a card,
 * @param idCard
 * @code 401 if board is private and user logged out
 * @code 403 if board is private and user isn't member
 * @code 404 if board doesn't exist
 */
router.get('/:idCard([0-9a-fA-F]{24})/comments', (req, res) => {
  let idCard = req.params.idCard;
  let user = req.user;
  commentController.findByCard({ idCard }, user)
    .then(comment => res.json(comment))
    // .catch(error => error === boardController.WRONG_PARAMS ? res.status(400).json({ error }) : Promise.reject(error))
    // .catch(error => error === cardController.IS_PRIVATE && !user ? res.status(401).json({ error }) : Promise.reject(error))
    // .catch(error => error === cardController.IS_PRIVATE && user ? res.status(403).json({ error }) : Promise.reject(error))
    // .catch(error => error === cardController.NOT_FOUND ? res.status(404).json({ error }) : Promise.reject(error))
    .catch(error => console.error(error) || res.sendStatus(500));
});

/**
 * get checklist from idCard
 */
router.get('/:idCard([0-9a-fA-F]{24})/checklists', (req, res) => {
  let idCard = req.params.idCard;
  let user = req.user;
  checklistController.findByCard({idCard}, user)
  .then(checklist => res.json(checklist))
  .catch(error => console.error(error) || res.sendStatus(500))
  .catch(error => error === checklistController.DELETED ? res.json(404).json({error}) : Promise.reject(error));

});








router.get('/:idMember', (req, res) => {
  cardController.findWithFilters( query, user )
    .then(cards => res.json(cards))
    .catch( error => console.error(error) || res.sendStatus(500));
  
  });

module.exports=router;